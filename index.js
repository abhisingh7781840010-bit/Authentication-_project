
const express=require("express");
const app=express();

require('dotenv').config();
const PORT=process.env.PORT || 4000;

app.use(express.json());    //add later

//cookieparser
const cookieParser=require("cookie-parser");
app.use(cookieParser());

const { config, configDotenv } = require("dotenv");
require("./config/database").connect();

//routes import and mount
const user=require("./routes/user");
app.use("/api/v1",user);

//cloudinary
const fileupload=require("express-fileupload");
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/' 
}));

 const db=require("./config/database");
 //db.connect();

const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const Upload=require("./routes/FileUpload");
// const fileUpload = require("express-fileupload");
app.use('/api/v1/upload',Upload);

 //activate
app.listen(PORT,()=>{
    console.log(`app is listening at ${PORT}`);  
})
