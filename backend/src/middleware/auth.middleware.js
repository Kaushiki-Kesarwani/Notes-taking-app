import jwt from 'jsonwebtoken';

export const protect = (req,res,next)=>{
    try{
        const token = res.cookies.token;

        if(!token){
            return res.status(401).json({
                success:false,
                message:"unauthorised user",
            });
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        res.userId = decoded.userId;

        next();
    }catch{
        return res.status(401).json({
            success:false,
            message:"Invalid token"
        });
    }
}