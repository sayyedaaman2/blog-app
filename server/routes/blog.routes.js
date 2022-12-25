const blogController = require('../controllers/blog.controller');
const {blogValidation} = require('../middlewares');
module.exports = (app)=>{

    //create the blog api
    app.post('/blogapp/v1/blog/create', blogValidation.blogDataValidator, blogController.createBlog);

    //update the blog api
    app.put('/blogapp/v1/blog/:id',blogValidation.isValidBlogId, blogController.updateBlog);

    //get single id
    // app.get('/blogapp/v1/blog/:id', blogController.findSingleBlog);

    //get all blogs
    app.get('/blogapp/v1/blogs',blogController.findAllBlog);

    //get blog by name
    app.get('/blogapp/v1/blog/:name', blogController.findBlog);
    
    //get blog by hashTag
    app.get('/blogapp/v1/blog/hash', blogController.findBlogbyHashTag);
    
    //delete the  blog 
    app.delete('/blogapp/v1/blog', blogController.deleteBlog);
    
}