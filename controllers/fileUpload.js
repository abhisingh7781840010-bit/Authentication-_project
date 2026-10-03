const File=require("../model/File");
const { options } = require("../routes/user");
const cloudinary=require("cloudinary").v2;


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
      res.status(500).json({
        success:false,
        message:error.message
      });

   }
};

module.exports = {
    localFileUpload
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder) {
    const options={folder};

     return await cloudinary.uploader.upload(file.tempFilePath,options);    
}

//file upload krne ke liye bnaye h
module.exports.imageUpload= async (req,res)=>{
    try{
        //data fetch
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);
 
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'file format is not supported'
            })
        }

        //file format supported hai
        const response =await uploadFileToCloudinary(file,"Codehelp");
          console.log(response);

        //bd me data save kr lete h
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:'http://res.cloudinary.com/m6dcciz0/image/upload/v1791023084/Codehelp/w0d0d7c84v7hw3bquthu.jpg'
        });

        res.json({
            success:true,
            message:'Image successfully uploaded',
        })
    }catch(error){
        console.error(error);
            res.status(400).json({
                success:false,
                message:'somethimg went wrong',
            })
        
    }
}