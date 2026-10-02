 const express = require("express");
 const router= express.Router();

 const {localFileUpload}=require("../controllers/fileUpload");

 //api routes bnayenge 
 router.post("/localFileUpload",localFileUpload);

module.exports=router;
