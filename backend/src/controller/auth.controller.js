import User from "../model/user.js";
import bcrypt from 'bcryptjs'

export const signup = async (req,res)=>{
    try{
    const{name,email,password} = await req.body;

    //validation
    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message:"All field are required"
        });
    }

    //if user already exist
     const existingUser = await User.findOne({email});

     if(existingUser){
        return res.status(409).json({
            success:false,
            message:"user already exist"
        });
     }

     const hashedpassword = await bcrypt.hash(password,10);

     const user = new User({
        name,
        email,
        password:hashedpassword,
     });

     if(user){
  await user.save();
     }
   
     return res.status(201).json({
        success:true,
        message:"user created successfully",
        
     }); 
    }
     catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal server error",
        });
     }
 }

 

