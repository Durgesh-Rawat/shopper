import React, { useContext,useState } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext';
import {Item} from '../Components/Item/Item'



export const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext);
  const [sortType, setSortType] = useState("");
 
  const getSortedProducts = () => {
      let products = [...all_product];
        
      if (sortType === "low-high") {
             products.sort((a, b) => a.new_price - b.new_price);
          }
      
      if (sortType === "high-low") {
            products.sort((a, b) => b.new_price - a.new_price);
          }

       return products;
     };



  return (
    <div className='shop-category'>
       <img className='shopcategory-banner' src={props.banner} alt="" />
       <div className="shopcategory-indexSort">
          <p>
             <span>Showing 1-12</span> out of 36 products
          </p>
          <div className="shopcategory-sort">
            sort by: 
            <select onChange={(e) => setSortType(e.target.value)}>
              <option value="">Relevant</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </div>
       </div>
       <div className="shopcategory-products">
         {getSortedProducts().map((item,i)=>{
           if(props.category===item.category){
              return <Item key={i} id={item._id.toString()} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
           }else{
             return null;
           }
         })}
       </div>
       <div className="shopcategory-loadmore">
         Explore More
       </div>
    </div>
  )
}
