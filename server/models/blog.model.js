const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    userid : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    hashTag : {
        type : [ String ],
        default : []
    }

},{
    versionKey : false , timestamps : true
});
blogSchema.index({name : "text"});
module.exports = mongoose.model("blog", blogSchema);