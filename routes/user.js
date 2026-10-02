const express=require("express");
const router=express.Router();

const {login,signup}=require("../controllers/Auth");
const {auth,isStudent,isAdmin}=require("../middleware/auth");

router.post("/login",login);
router.post("/signup",signup);

//testing protected route for middle ware
router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route of TESTS",
    });
});

//protected route
router.get("/student", auth , isStudent, (req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route of student",
    });
});

router.get("/admin",auth , isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route of Admin",
    });
});

module.exports=router;