import mongoose from "mongoose";
import { Cart } from "../models/cart.js";

//API FOR ADD ITEM TO CART
export const addtocart = async(req,res)=>{
  try {
      const { productId, size, quantity } = req.body;
      if (!productId) {
           return res.status(400).json({ message: "Product ID is required" });
          }

      let cart = await Cart.findOne({ user: req.user.id });

     if (!cart) {
           cart = new Cart({
                  user: req.user.id,
                  items: [{ product: productId,size:size ,quantity: quantity || 1}]
             });
      }else {
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId && item.size === size);
            if (itemIndex > -1) {
                  cart.items[itemIndex].quantity += quantity || 1;
             }else {
                cart.items.push({ product: productId,size: size, quantity: quantity || 1 });
            }
       }

       await cart.save();

      const updatedCart = await Cart.findOne({ user: req.user.id }).populate("items.product");

       return res.status(200).json({
            message: "Product added to cart",
            items: updatedCart.items,
     });
  }catch(error){
    console.log("server error",error);
    return res.status(500).json({ message: "Server error" });
  }
}

//API FOR REMOVE ITEM FROM CART
export const removefromcart = async(req,res)=>{
      try {
          const { productId } = req.params;
          const {size} = req.body;
          if (!productId && !size) {
           return res.status(400).json({ message: "Product ID is required" });
          }

          const cart = await Cart.findOne({ user: req.user.id });
          if (!cart && !size) {
            return res.status(404).json({ message: "Cart not found" });
          }
          cart.items = cart.items.filter(item => !(item.product.toString() === productId && item.size === size));

          await cart.save();
         
          const updatedCart = await Cart.findOne({ user: req.user.id }).populate("items.product"); 

          return res.status(200).json({
              message: "Item removed from cart",
              items: updatedCart.items,
         });
         }catch(error){
          console.log(error);
          return res.status(500).json({ message: "Server error" });
         }
   }

 




//API FOR GET ITEM FROM CART
export const getcart = async(req,res)=>{
    try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate("items.product"); // get product details

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    console.log("cart items : ",cart.items);
    return res.status(200).json(cart.items);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}