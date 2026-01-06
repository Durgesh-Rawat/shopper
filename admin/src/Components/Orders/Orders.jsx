import React, { useState, useEffect } from 'react'
import { backendUrl } from '../../App';
import './Orders.css'


export const Orders = () => {

  const [usersOrder, setUsersOrder] = useState([]);
  const safeUsersOrder = Array.isArray(usersOrder) ? usersOrder : [];

  useEffect(() => {
    fetch(`${backendUrl}/api/admin/adminorderget`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setUsersOrder(data);
        } else {
          setUsersOrder([]);
        }
      })
      .catch(err => {
        console.error("Failed to fetch orders", err);
        setUsersOrder([]);
      });
  }, []);



  const updateStatus = async (orderId, status) => {
    const res = await fetch(`${backendUrl}/api/admin/updateOrderStatus/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      setUsersOrder(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    }
  };



  return (
    <div className='orderouter'>
      <div className="ordermain">
        <h1>Order Page</h1>
        <div className="ordercontainer">
          {
            (safeUsersOrder.length < 1) ? <div className='noorder'>NO ORDER YET...</div> :
              safeUsersOrder.map((order) => (
                <div key={order._id} className="itemcontainer">
                  {Array.isArray(order.items) && order.items.map((item, index) => (
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
