import React, { useContext} from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export const CartItems = () => {
    const {updateCartQuantity,getTotalCartAmount,cartItems,removeFromCart} = useContext(ShopContext);
    const navigate = useNavigate();

        // 🔥 CRASH-PROOF FIX
    const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

    const handlebtn = () =>{
        if(safeCartItems.length<1){
            toast.error("choose product")
        }else{
           navigate("/place-order");
        }
    }
    
  return (
   <>
    <div className='cartitems'>
       <div className="cartitems-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
       </div>
       <hr />


      {safeCartItems.map((item)=>{
            if (!item?.product) return null;
            return(<div key={`${item.product._id}-${item.size}`}>
                      <div className="cartitems-format cartitems-format-main">
                           <img src={item.product.image} alt="" className='carticon-product-icon'/>
                           <p>{item.product.name} [{item.size}]</p> 
                           <p>₹{item.product.new_price}</p>
                           <input type="number" min="1" className='cartitems-quantity'
                           value={item.quantity} onChange={(e) => updateCartQuantity(
                                 item.product._id,item.size,Number(e.target.value))}/>
                           <p>₹{item.product.new_price*item.quantity}</p>
                           <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(item.product._id,item.size)}} alt="" />
                      </div>
                      <hr />
                     </div>)
      })}
      
      <div className="cartitems-down">
         <div className="cartitems-total">
            <h1>cart Totals</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>₹{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>₹{getTotalCartAmount()}</h3>
                </div>
            </div>
           <button onClick={handlebtn}>PROCEED TO CHECKOUT</button>

         </div>
         <div className="cartitems-promocode">
             <p>If you have a promo code, Enter it here</p>
             <div className="cartitems-promobox">
                <input type="text" placeholder='promo code' />
                <button>Submit</button>
             </div>
         </div>
      </div>
    </div>
</>
  )
}
