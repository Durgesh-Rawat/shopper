import jwt from "jsonwebtoken"
  
  const adminAuth = async (req,res,next)=>{

     const {token} = req.headers
     if(!token){
        res.status(401).send({errors:"Please authenticate using valid Tokened"})
     }else{
        try{
           const token_decode  = jwt.verify(token,process.env.JWT_SECRET);
           if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
              console.log("token_decode",token_decode)
              res.status(401).send({errors:"Please authenticate using valid Tokened"})
           }
           next()
        } catch(error){
            console.log(error);
            res.json({success:false,message:error.message})
        }
     }
  };

export default adminAuth;