import User from '../model/user.js'

export const getMe = async (req,res)=>{
    try{
        const user = await User.findById(req.userId).select("-password");

        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            });
        }
        
        return res.status(200).json({
            success: true,
            user,
        });
    }catch(err){
        console.log(err);

        return res.status(500).json({
            success:false,
            message:"Internal server error."
        });
    }
}