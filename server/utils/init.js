const Blog = require('../models/blog.model')

exports.init = async()=> {
    try {
        const blogData = [
            {
                userid: "user1",
                name: "how to connect the MongoDB database through mongoose",
                content: `1. install the mongoose module on your local project
                2. require the module mongoose and assigned.
                3. const mongoose = require('mongoose');
                    mongoose.connect(<DB_URL>); 
                    db.on("error",()=>{
                        console.log("Error while connecting to MongoDB");
                    });
                    db.once("open", ()=>{
                        console.log("Connected to mongoDB");
                    });
                `,
                hashTag: ["mongodb", "nodejs", "express"]
            },
            {
                userid: "user2",
                name: "how to create server in node.js",
                content: `1. install the external module  'express' on your local project
                2. require the module express and assigned.
                3. const express = require('express');
                    const app = express();
                    app.linsten(8080,()=>{
                        console.log('Server is running on PORT')
                    })
                `,
                hashTag: ["mongodb", "nodejs", "express"]
            }
        ]

        const createdBlog = await Blog.insertMany(blogData);
        console.log(createdBlog);

    } catch (err) {
        console.log(`Error while storing the raw data ${err}`);
    }
}