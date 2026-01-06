import React, { useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import { toast } from 'react-toastify';


export const ProductDisplay = (props) => {
    const {product} = props;
    const{addToCart} = useContext(ShopContext)
    const [selectedSize,setSelectedSize] = useState("");

    const handlebtn = ()=>{
      if(!selectedSize){
         toast.error("please select size");
         return;
      }
      
     addToCart(product._id,selectedSize);

    }

  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
           <div className="productdisplay-img-list">
             <img src={product.image} alt="" />
             <img src={product.image} alt="" />
             <img src={product.image} alt="" />
             <img src={product.image} alt="" />
           </div>
           <div className="productdisplay-img">
             <img src={product.image} alt="" className="productdisplay-main-img" />
           </div>
        </div>
        <div className="productdisplay-right">
          <h1>{product.name}</h1>
          <div className="productdisplay-right-star">
             <img src={star_icon} alt="" />
             <img src={star_icon} alt="" />
             <img src={star_icon} alt="" />
             <img src={star_icon} alt="" />
             <img src={star_dull_icon} alt="" />
             <p>(122)</p>
          </div>
          <div className="productdisplay-right-prices">
             <div className="productdisplay-right-price-old">₹{product.old_price}</div>
             <div className="productdisplay-right-price-new">₹{product.new_price}</div>
          </div>
          <div className="productdisplay-right-description">
             A lighweight, usually knitted, pullover shirt, close-fitting 
             and with a round neckline and short sleeves, worn as an undershirt or outer garment.
          </div>
          <div className="productdisplay-right-size">
             <h1>Select Size</h1>
             <div className="productdisplay-right-sizes">
                 <button onClick={()=> {setSelectedSize("S")}}  className='sizebtn'>S</button>
                 <button onClick={()=> {setSelectedSize("M")}} className='sizebtn'>M</button>
                 <button onClick={()=> {setSelectedSize("L")}} className='sizebtn'>L</button>
                 <button onClick={()=> {setSelectedSize("XL")}} className='sizebtn'>XL</button>
                 <button onClick={()=> {setSelectedSize("XXL")}} className='sizebtn'>XXL</button>
             </div>
          </div>
          <button className="addtocartbtn" onClick={handlebtn}>ADD TO CART</button>
          <p className='productdisplay-right-category'><span>Category : </span>Women , T-Shirt, Crop Top</p>
          <p className='productdisplay-right-category'><span>Tags : </span>Modern, Latest</p>
        </div>
    </div>
  )
}
