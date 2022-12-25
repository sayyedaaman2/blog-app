const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbConfig = require('./configs/db.config');
const serverConfig = require('./configs/server.config');
const {init} = require('./utils/init');
const Blog = require('./models/blog.model');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


mongoose.set('strictQuery', false);
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error",()=>{
    console.log("Error while connecting to MongoDB");
});
db.once("open", ()=>{
    console.log("Connected to mongoDB");
    //init();
});



app.get('/',(req,res)=>{
    res.status(200).send("Testing the api !!!");
})


require('./routes/blog.routes')(app);
app.listen(serverConfig.PORT,()=>{
    console.log(`Server is running on PORT ${serverConfig.PORT}`);
})