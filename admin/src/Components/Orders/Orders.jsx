import React, { useState, useEffect } from 'react'
import { backendUrl } from '../../App';
import './Orders.css'


export const Orders = () => {

  const [usersOrder, setUsersOrder] = useState([]);


  useEffect(() => {
    fetch(`${backendUrl}/api/admin/adminorderget`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => setUsersOrder(data))
  }, [])


  const updateStatus = async (orderId, status) => {
    await fetch(`${backendUrl}/api/admin/updateOrderStatus/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ status }),
    });
  };



  return (
    <div className='orderouter'>
      <div className="ordermain">
        <h1>Order Page</h1>
        <div className="ordercontainer">
          {
           (usersOrder<1) ? <div className='noorder'>NO ORDER YET...</div> :
          usersOrder.map((order) => (
            <div key={order._id} className="itemcontainer">
              {order.items.map((item, index) => (
                <div key={index} className="itemorder">
                  <div className="maincontainer">
                    <div className="productitems">
                      <div><img src={item.product.image} alt={item.product.name} /></div>
                      <div className='userdetail'>
                        <p className='productname'>{item.product.name}</p>
                        <div className='producttext'>
                          <p>Price: ₹{item.product.new_price}</p>
                          <p>Qty: {item.quantity}</p>
                          <p>Size: {item.size}</p>
                        </div>
                        <p className='producttext'>Date: {new Date(order.createdAt).toLocaleDateString("en-GB")}</p>
                        <p className='producttext'>Payment : {order.paymentMethod}</p>
                      </div>
                    </div>
                    <div className='orderleft'>
                      <div className="orderstatus">
                        <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)}>
                          <option value="Order Placed">Order Placed</option>
                          <option value="Packing">Packing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out For Delivery">Out For Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                  </div> <hr />
                </div>))}
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}
