const File=require("../model/File");
const path=require("path");

const localFileUpload = async (req, res) => {
    // upload logic store krte h 

   try{ 
      const file=req.files.file;
      console.log("file aa gyi",file);
      
      let path= __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}` ;

      console.log("PATH->",path)

       file.mv(path,(err)=>{
        console.log("ERROR HAI",err); 

      });
     res.json({
        success: true,
        message: "File uploaded successfully"
    });

   }catch(error){
     console.log(error);
   }
};

module.exports = {
    localFileUpload
};