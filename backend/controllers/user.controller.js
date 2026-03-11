import { UserModel } from "../model/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendVerificationEmail } from "../services/sendEmail.js";
export const registerController = async(req,res)=>{
    try {
       let {name,email,password} = req.body;
       if(!name || !email || !password)
       {
         return res.status(400).json({
            message: "All fields are required"
         });
       }
        const isExsisted = await UserModel.findOne({email});
       if(isExsisted)
       {
        return res.status(409).json({
            message: "User already exsisted"
        })
       }
       let hashedPass = await bcrypt.hash(password,10);
       let newUser = await UserModel.create({
        name,
        email,
        password: hashedPass,
       })
        let verifyToken = jwt.sign(
        {id: newUser._id},
        process.env.JWT_SECRET_KEY,
        {expiresIn: "1h"})
        
       await sendVerificationEmail(email, verifyToken);
       return res.status(201).json({
        message: "Verification email sent",
      });
       }
     catch (error) {
       return res.status(500).json({
        message: "Internal server error",
       
       })
    }
}

export const verifyEmail = async (req, res) => {

  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await UserModel.findById(decoded.id);
    if (!user) 
    return res.status(404).json({ message: "User not found" });
    user.isVerified = true;

    await user.save();

    res.json({
      message: "Email verified successfully"
    });

  } catch (error) {
    res.status(400).json({
      message: "Invalid token"
    });
  }
};

export const loginController = async(req,res)=>{
    try {
        let{email,password} = req.body;
        if(!email || !password)
        {
            return res.status(400).json({
                message: "Email and Password are required"
            })
        }
      let user = await UserModel.findOne({email});
      if(!user)
      {
        return res.status(400).json({
            message: "user not found!"
        })
      }
       if (!user.isVerified) {
      return res.status(401).json({
        message: "Please verify email"
      });
    }

      let comparePass = await bcrypt.compare(password, user.password);
      if(!comparePass)
      {
        return res.status(401).json({
            message: "Invalid credentials"
        })
      }
      let loginToken = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET_KEY,
        {expiresIn: "1h"});

      res.cookie("token",loginToken)
      
      return res.status(200).json({
        message: "Login successfully"
      })
    } catch (error) {
    return res.status(500).json({
        message: "Internal server error"
    }) 
    }
}

export const currentUserController = (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  res.status(200).json({
    user: { id: req.user._id, name: req.user.name, email: req.user.email },
  });
};

export const logoutController = async (req, res) => {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: false
    });

    return res.status(200).json({
      message: "User logged out successfully"
    });

  } catch (error) {

    return res.status(500).json({
      message: "Internal server error"
    });

  }
};