import jwt from 'jsonwebtoken';
import { UserModel } from '../model/user.model.js';

 export const authMiddleware = async(req,res,next)=>{
    try {
     let token = req.cookies.token;
     if(!token)
     {
        return res.status(401).json({
            message: "token not found, unauthorized user!"
        })
     }
     let decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
      if(!decoded)
      {
        return res.status(401).json({
            message: "Invalid token",
        })
      }
     let user = await UserModel.findById(decoded.id)
     req.user = user;
     next()
    } catch (error) {
     return res.status(401).json({
        message: "Invalid or token not found"
     }) 
    }
}