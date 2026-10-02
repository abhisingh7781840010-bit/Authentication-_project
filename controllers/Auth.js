
const bcrypt=require("bcrypt");
const User = require("../model/user");
//const user = require("../model/user");
const jwt= require("jsonwebtoken");
const { options } = require("../routes/user");
require("dotenv").config();

//signup
exports.signup = async (req,res)=>{
    try{
         const  {name,email,password,role} = req.body;

         const existingUser=await User.findOne({email});

         if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exists",
            });
         }

       //secure password
       let hashedPassword;
       try{
         hashedPassword=await bcrypt.hash(password,10);  //hash=hashed
       }
       catch(err){      
           return res.status(500).json({
               success:false,   //true
               message:"err in hashing the password"
           });
       }

       const user= await User.create({  
            name,email,password:hashedPassword,role
       });
         return res.status(200).json({
            success:true,
            message:"user created successfully",
            
         });

    }
    catch(error){
      console.error(error);
      return res.status(500).json({
        success:false,
        message:"user cannot be registered, please try again later",
      });
    }
};

//login
exports.login=async(req,res)=>{
    try{

        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"please fill all the details carefully"
            });
        }
        
        let user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user is not registered"
            });
        }

        const payload={
            email:user.email,
            id:user._id,
            role:user.role
        };

         //verify password and jwt token
         if(await bcrypt.compare(password,user.password)){
              //match
               let token=jwt.sign(payload,
                                  process.env.JWT_SECRET,
                                  {
                                    expiresIn:"1h",
                                  });
                               
            user=user.toObject();                      
            user.token=token;
            user.password=undefined; 
            const option={
               expires:new Date(Date.now() + 3*24*60*60*1000),
               httpOnly:true,
            }               
       //cookies
            res.cookie("token",token,options).status(200).json({
            
                success:true,
                token,
                user,
                message:"user logged in successfully",
            });

         }else{
            //password not match
            return res.status(403).json({
                success:false,
                message:"password incorrect"
            });
         }
    }
    catch(error){
      console.log(error);
      return res.status(500).json({
        success:false,
        message:"login failure"
      });
    }
}