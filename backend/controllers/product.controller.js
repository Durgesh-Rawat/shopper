import { Product } from "../models/product.js";


export const addproduct = async (req,res)=>{

    let lastProduct = await Product.findOne().sort({ id: -1 });
    let id = lastProduct ? lastProduct.id + 1 : 1;

    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });

    await product.save();

    console.log("product saved");

    res.json({
        success:true,
        name:req.body.name
    });
}


export const removeproduct = async (req,res)=>{

    const deleted = await Product.findOneAndDelete({_id:req.body.id});

    if(!deleted){
        return res.json({success:false,message:"Product not found"});
    }

    console.log("product removed");

    res.json({
        success:true
    });
}



