
//auth,isStudent,isAdmin

const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=(req,res,next)=>{
     try{
        //extract jwt token
        const token=req.body.token;  //req.cookies.token
        
        if(!token){
           return res.status(401).json({
            success:false,
            message:"token missing"
           });
        }
        //verifr the token
        try{
          const payload=jwt.verify(token,process.env.JWT_SECRET);
          req.user=payload;

        }catch(error){
             return res. status(401).json({
                success:false,
                message:"token is invalid",
             });
          next();
        }

     }catch(error){
        return res.status(401).json({
            success:false,
            message:"something went wrong, while verifying the token",
        });
     }
}

exports.isStudent=(req,res,next)=>{
     try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"this is the protected route for student ",
            });
        }
        next();

     }catch(error){
            return res.status(500).json({
                success:false,
                message:"user role is not matching",
            });
     }
}

exports.isAdmin=(req,res,next)=>{
     try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"this is the protected route for Admin ",
            });
        }

        next();

     }catch(error){
            return res.status(500).json({
                success:false,
                message:"user role is not matching",
            });
     }
}