import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const signin = async(req,res)=>{
    let user = await User.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            return res.json({success:true,token});
        }else{
            return res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{
       return res.json({success:false,errors:"Wrong Email Id"})
    }
}



export const signup = async(req,res)=>{
    let check = await User.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing user found with same email address"})
    }

    const user = new User({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,process.env.JWT_SECRET);
    return res.json({success:true,token});
}


