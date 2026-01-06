import {React,useContext} from 'react'
import './RelatedProducts.css'
import {Item} from '../Item/Item.jsx'
import { ShopContext } from '../../Context/ShopContext';

export const RelatedProducts = (props) => {
  const {all_product} = useContext(ShopContext);
  const {product} = props;
  const related_products = all_product.filter((item) =>item.category === product.category && item.id !== product.id).slice(0, 4);

  
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
          
           {related_products.map((item,i)=>{
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
           })}
        </div>
    </div>
  )
}
