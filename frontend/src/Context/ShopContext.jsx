import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { backendUrl } from '../config';
import { toast } from 'react-toastify';

export const ShopContext = createContext(null);


const ShopContextProvider = (props) => {

     const[all_product,setAll_Product] = useState([]);
     const [cartItems,setCartItems] = useState([]);
    



     useEffect(()=>{
        fetch(`${backendUrl}/allproducts`)
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')){
          fetch(`${backendUrl}/api/cart/getcart`,
             {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem('auth-token'),
               },
            })
          .then((response)=>response.json())
          .then((data)=>setCartItems(data));
        }
     },[])  
     
    
 const addToCart = async (productId,size ,quantity = 1) => {
  try {
    const res = await fetch(`${backendUrl}/api/cart/addtocart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({ productId,size, quantity,}),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error("Failed to add to cart");
      return;
    }

    setCartItems(data.items);
    toast.success("added to cart");
  } catch (error) {
    console.error("Add to cart error:", error);
  }
};

const removeFromCart = async (productId,size) =>{
    try {
        const res = await fetch(`${backendUrl}/api/cart/removefromcart/${productId}`,
          {
           method: "POST",
           headers: {
               "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
           },
           body: JSON.stringify({size}),
          });

      const data = await res.json();

      if (!res.ok) {
         toast.error("Failed to remove item");
         return;
        }
        
        setCartItems(data.items);
        toast.success("Item removed");
      } catch (error) {
        console.error("Remove from cart error:", error);
     }
}

     const getTotalCartAmount = () => {
          let totalAmount = 0;
          cartItems.forEach(item => {
            if(item.product){
               totalAmount += item.product.new_price*item.quantity;
            }
          });
          return totalAmount;
     }

     
     const getTotalCartItems = () =>{
          let totalItem = 0;
           if (!cartItems || !Array.isArray(cartItems)) return 0;
          cartItems.forEach((item) =>{
                totalItem+= item.quantity; 
          });
          return totalItem;
     }

     const updateCartQuantity = (productId, size, quantity) => {
         if (quantity < 1) return;
         setCartItems((prevItems) => prevItems.map((item) =>item.product._id === productId && item.size === size
            ? { ...item, quantity } : item));
      };



     const contextValue = {updateCartQuantity,getTotalCartItems,getTotalCartAmount,all_product,cartItems,setCartItems,addToCart,removeFromCart};


     return(
        <ShopContext.Provider value={contextValue}>
             {props.children}
        </ShopContext.Provider>
     )
}

export default ShopContextProvider;