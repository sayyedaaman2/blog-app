const Blog = require('../models/blog.model');

exports.createBlog = async (req, res) => {
    try {
        const blogData = {
            userid: req.body.userid,
            name: req.body.name,
            content: req.body.content,
            hashTag: req.body.hashTag
        }

        const blogCreated = await Blog.create(blogData);

        res.status(201).send({
            Message: "Successfully Created the Blog",
            data: blogCreated
        });

    } catch (err) {
        console.log(`Error while the creating the blog ${err}`);
        res.status(500).send({
            Message: "Internal Server Error"
        })
    }
}

exports.updateBlog = async (req, res) => {
    try {

        const blog = req.blog;

        blog.name = req.body.name != undefined ? req.body.name : blog.name;
        blog.content = req.body.content != undefined ? req.body.content : blog.content;
        if (req.body.addHashTag) {
            const addHashTag = req.body.addHashTag;
            addHashTag.forEach((tag) => {
                let existTag = false;
                blog.hashTag.map((oldTag) => {
                    if (tag == oldTag) {
                        existTag = true;
                    }
                })
                if (!existTag) {
                    blog.hashTag.push(tag);
                }
            })
        }

        if (req.body.removeHashTag) {
            for (tag of req.body.removeHashTag) {
                await blog.hashTag.remove(tag);
            }

        }
        const blogUpdated = await blog.save();

        res.status(200).send({
            Message: "Successfully Updated the Blog",
            data: blogUpdated
        });

    } catch (err) {
        console.log(`Error while the updating the blog ${err}`);
        res.status(500).send({
            Message: "Internal Server Error"
        })
    }
}
// find by name 
exports.findBlog = async (req, res) => {
    try {
        // const blogs = await Blog.find({ name: { $regex: `${req.params.name}` } });
        // console.log(req.params.name);
        const serachString = req.params.name;
        const blogs = await Blog.find({$text : {$search : serachString}})


        if (blogs.length == 0) {

            res.status(404).send({
                message: "Not Found"
            })
            return;
        }
        else {

            res.status(200).send({
                Message: "Successfully fetch the Blog",
                data: blogs
            });
        }

    } catch (err) {
        console.log(`Error while the finding the blog ${err}`);
        res.status(500).send({
            Message: "Internal Server Error"
        })
    }
}

exports.findBlogbyHashTag = async (req, res) => {
    try {
        /**
         * db.blogs.aggregate([{$match : {hashTag : {$in : ["vsCode", "express"]}}}]);

         */
        const hashTag = req.body.hashTag;
        console.log(hashTag);
        const blogs = await Blog.aggregate([{$match : {hashTag : {$in : hashTag}}}])
        console.log(blogs);
        if (blogs.length == 0) {

            res.status(404).send({
                message: "Not Found"
            })
            return;
        }
        else {

            res.status(200).send({
                Message: "Successfully fetch the Blog",
                data: blogs
            });
        }


    } catch (err) {
        console.log(`Error while the finding the blog ${err}`);
        res.status(500).send({
            Message: "Internal Server Error"
        })
    }
}

exports.deleteBlog = async (req, res) => {
    try {

        const blogDelete = await Blog.deleteOne({ _id: req.params.id });

        res.status(200).send({
            Message: "Successfully Delete  the Blog",
            data: blogDelete
        });

    } catch (err) {
        console.log(`Error while the deleting the blog ${err}`);
        res.status(500).send({
            Message: "Internal Server Error"
        })
    }
}