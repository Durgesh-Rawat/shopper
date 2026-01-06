import React, { useEffect, useState } from 'react'
import './CSS/UserOrder.css'
import { backendUrl } from '../config.js'
import { useNavigate } from "react-router-dom";

export const UserOrder = () => {

  const [usersOrder, setUsersOrder] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${backendUrl}/api/orderuser/getorder`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsersOrder(data))
  }, [navigate])

  return (
    <div className='orderPage'>
      <div className="orderContainer">
        <div>
          <h1>MY ORDERS</h1><hr />

          {(usersOrder.length < 1) ? <div className='noOrder'>No Orders Yet..</div> :
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
                         <div className='orderStatus'>
                            <p></p>
                            <strong>{order.status}</strong>
                          </div>
                        <div>
                          <button>Track Order</button>
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
