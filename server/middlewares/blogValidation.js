const ObjectId = require('mongoose').Types.ObjectId;
const Blog = require('../models/blog.model');

const blogDataValidator = (req, res, next) => {
    try {
        if (!req.body.userid && typeof req.body.userid !== "string") {
            res.status(400).send({
                message: `Provide the userid it's should be string`
            })
            return;
        }
        if (!req.body.name && typeof req.body.name !== "string") {
            res.status(400).send({
                message: `Provide the name it's should be string`
            })
            return;
        } if (!req.body.content && typeof req.body.content !== "string") {
            res.status(400).send({
                message: `Provide the content it's should be string`
            })
            return;
        } if (!req.body.hashTag && Array.isArray(req.body.hashTag)) {
            res.status(400).send({
                message: `Provide the hashTag it's should be Array`
            })
            return;
        }
        next();
    } catch (err) {
        console.log(`Error while the validating the blog data  ${err}`);
    }
}
function isValidObjectId(id) {

    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

const isValidBlogId = async (req, res, next) => {
    try {

        if (!isValidObjectId(req.params.id)) {
            res.status(400).send({
                message: "Invaild Object Id"
            })
        }

        const blog = await Blog.findOne({ _id: req.params.id });
        console.log(blog);
        if (blog == null) {
            res.status(404).send({
                message: "Blog is not exists !!!"
            })
            return;
        }
        req.blog = blog;

        if (req.body.addHashTag) {
            if (!Array.isArray(req.body.addHashTag)) {
                res.status(400).send({
                    message: "addHashTag is should  be Array !!!"
                })
                return;
            }
        }
        if (req.body.removeHashTag) {
            if (!Array.isArray(req.body.removeHashTag)) {
                res.status(400).send({
                    message: "removeHashTag is should  be Array !!!"
                })
                return;
            }
        }

        next();
    } catch (err) {
        console.log(`Error while the validating the blog data  ${err}`);
    }
}

const blogValidation = {
    blogDataValidator: blogDataValidator,
    isValidBlogId: isValidBlogId
}

module.exports = blogValidation;