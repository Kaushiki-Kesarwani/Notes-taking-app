import user from "../ models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/utils.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName && !email && !password) {
      return res.status(400).json({ msg: "All fields are required!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "password must be atleast 6 characters" });
    }

    const useremail = await user.findOne({ email });

    if (useremail) {
      return res.status(400).json({ msg: "Email already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);

    const newUser = new user({
      fullName,
      email,
      password: hashedpass,
    });

    if (newUser) {
      await newUser.save();

      generateToken(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({
        message: "Invalid user data",
      });
    }
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const useremail = await user.findOne({ email });

    if (!useremail) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      useremail.password,
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

export const logout = async (req, res) => {
  try{
    res.cookie("jwt","",{
      maxAge:0,
    });

    res.status(200).json({msg:"Logged out successfully"});
  }catch(err){
    res.status(500).json({msg:"Internal server error"});
  }
};
