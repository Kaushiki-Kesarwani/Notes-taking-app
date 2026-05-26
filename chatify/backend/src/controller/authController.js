import user from '../ models/userModel.js'
import bcrypt from 'bcryptjs' 

export const signup = async (req,res)=>{
    const{fullName, email, password} = req.body;

    try{
        if(!fullName && !email && !password){
            return res.status(400).json({msg:"All fields are required!"});
        }

        if(password.length < 6){
            return res.status(400).json({msg:"password must be atleast 6 characters"});
        }

        const useremail = await user.findOne({email});

        if(useremail){
            return res.status(400).json({msg:"Email already exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(password,salt);


        const newUser = new user({
            fullName,
            email,
            password:hashedpass,
        });

        if (newUser) {
      await newUser.save();

      res.status(201).json({
        message: "User created successfully",
      });
    } else {
      res.status(400).json({
        message: "Invalid user data",
      });
    }

    }catch(err){
        return res.status(500).json("Internal server error");
    }
};

export const login = async (req,res)=>{
    const{email,password} = req.body;

    try{
        const useremail = await user.findOne({email});

        if(!useremail){
            return res.status(400).json({msg:"Invalid credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password,useremail.password);

        if(!isPasswordCorrect){
            return res.status(400).json({msg:"Invalid credentials"});
        }

         res.status(200).json({
      message: "Login successful",
    });

    }catch(err){
          return res.status(500).json("Internal server error");
    }
};

export const logout = async (req,res)=>{
    res.send("logout route");
}