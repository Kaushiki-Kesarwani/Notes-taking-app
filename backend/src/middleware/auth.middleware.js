import jwt from "jsonwebtoken"
import user from "../ models/userModel.js"

export const protectRoute = async(req,res,next)=>{
    try{
        const token = req.cookies.jwt;

        if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No Token",
      });

    //   const decoded = jwt.verify(
    //     token,
    //     process.env.
    //   )

    }
    }catch(err){

    }
}