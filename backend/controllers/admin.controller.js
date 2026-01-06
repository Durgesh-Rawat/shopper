import { Admin } from "../models/admin.js";
import jwt from "jsonwebtoken";

export const admin = async(req,res) =>{
    try{
      const {email,password} = req.body 
      
      if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password,process.env.JWT_SECRET)
        console.log("token generated",token)
        res.json({success:true,token})
      }else{
        res.json({success:false,message:"invalid credential"})
      }
    }catch(error){
      console.log(error);
      res.json({success:false,message:error.message})
    }
}

export const admingetorder = async()=>{

}