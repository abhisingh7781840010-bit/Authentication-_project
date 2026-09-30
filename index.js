const { config, configDotenv } = require("dotenv");
const express=require("express");
const app=express();
app.use(express.json());    //add later

require('dotenv').config();
const PORT=process.env.PORT || 4000;

require("./config/database").connect();

//routes import and mount
const user=require("./routes/user");
app.use("/api/v1",user);

//activate
app.listen(PORT,()=>{
    console.log(`app is listening at ${PORT}`);
})
