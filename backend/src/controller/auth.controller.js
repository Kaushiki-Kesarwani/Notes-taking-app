import User from "../model/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const signup = async (req,res)=>{
    try{
    const{name,email,password} = req.body;

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

export const login = async (req,res)=>{
    try{
 const{email,password}  = req.body;

    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"All fields are required.",
        });
    }

    const user= await User.findOne({email});
    if(!user){
        return res.status(401).json({
            success:false,
            message:"Invalid email or password",
        });
    }

    const correctpassword = await bcrypt.compare(password,user.password);
    if(!correctpassword){
         return res.status(401).json({
            success:false,
            message:"Invalid email or password",
        });
    }

    const token = jwt.sign(
        {
              userId: user._id,
        },
            process.env.JWT_SECRET,
        {
            expiresIn:"7d",
        }
    );

    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
            success: true,
            message: "Login successful",
        });

    }catch(err){
        console.log(err);

         return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
 }

 export const logout = async (req,res)=>{
    try{
        res.clearCookie("token",{
          httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",  
        });

        return res.status(200).json({
            success:true,
            message:"logout successfully"
        });
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
 }
 

