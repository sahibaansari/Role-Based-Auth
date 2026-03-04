import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js"

export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: `User registered successfully ${username}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User not registered" });
  }
};

export const login =async(req,res)=>{
  try {
     const {username,password}= req.body;
     const user = await User.findOne({username});
    if(!user){
      res
        .status(404)
        .json({ message: `user with username ${username} not found` });
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return  res.status(400).json({message:`invalid password`});
    
    } 
    const token = jwt.sign(
      { id: user._id, role: user.role },

      process.env.JWT_SECRET,
      {
        expiresIn: "1hr",
      }
    );
    res.status(200).json({token})

    
  } catch (error) {
    res.status(500).json({message:`user not logged in`});
    
  }

};

