const blogController = require('../controllers/blog.controller');

module.exports = (app)=>{

    //create the blog api
    app.post('/blogapp/v1/blog/create', blogController.createBlog);

    //update the blog api
    app.put('/blogapp/v1/blog/:id', blogController.updateBlog);
    
    //get blog by name
    app.get('/blogapp/v1/blog/:name', blogController.findBlog);
    
    //get blog by hashTag
    app.get('/blogapp/v1/blogs/hash', blogController.findBlogbyHashTag);
    
    //delete the  blog 
    app.delete('/blogapp/v1/blog/:id', blogController.deleteBlog);
    
}