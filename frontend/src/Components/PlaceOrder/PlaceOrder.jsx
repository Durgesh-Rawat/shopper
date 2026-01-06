import React, { useContext, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import './PlaceOrder.css'
import { useNavigate } from "react-router-dom";
import { payment } from '../Payment/payment.jsx'
import { toast } from 'react-toastify';


export const PlaceOrder = () => {
    const navigate = useNavigate();
    const { getTotalCartAmount, cartItems, setCartItems } = useContext(ShopContext)
    const [paymentMethod, setPaymentMethod] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState({
        fistname: "",
        lastname: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "India",
        phone: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        setDeliveryAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const isAddressValid =
        deliveryAddress.firstname &&
        deliveryAddress.lastname &&
        deliveryAddress.email &&
        deliveryAddress.street &&
        deliveryAddress.city &&
        deliveryAddress.state &&
        deliveryAddress.zipcode &&
        deliveryAddress.phone;



    const handleplaceorderbtn = () => {
        if (!isAddressValid) {
            toast.error("Please fill all delivery address details");
            return;
        }

        if (!paymentMethod) {
            toast.error("Please select a payment method");
            return;
        }

        payment(getTotalCartAmount(), cartItems, setCartItems, paymentMethod, deliveryAddress, navigate);
    }




    return (
        <div className="placeorderMain">
            <div className="placeorder">

                <div className="useradress">
                    <h2>DELIVERY INFORMATION</h2>
                    <div className="details">
                        <div>
                            <input name='firstname' value={deliveryAddress.fullname} onChange={handleChange} type="text" placeholder='First Name' />
                            <input name='lastname' value={deliveryAddress.lastname} onChange={handleChange} type="text" placeholder='Last Name' />
                        </div>
                        <div>
                            <input name='email' value={deliveryAddress.email} onChange={handleChange} type="email" placeholder='Email Address' />
                        </div>
                        <div>
                            <input name='street' value={deliveryAddress.street} onChange={handleChange} type="text" placeholder='Street' />
                        </div>
                        <div>
                            <input name='city' value={deliveryAddress.city} onChange={handleChange} type="text" placeholder='City' />
                            <input name='state' value={deliveryAddress.state} onChange={handleChange} type="text" placeholder='State' />
                        </div>
                        <div>
                            <input name='zipcode' value={deliveryAddress.zipcode} onChange={handleChange} type="text" placeholder='Zipcode' />
                            <input name='country' value={deliveryAddress.country} onChange={handleChange} type="text" placeholder='Country' />
                        </div>
                        <div>
                            <input name='phone' value={deliveryAddress.phone} onChange={handleChange} type="text" placeholder='Phone Number' />
                        </div>
                    </div>
                </div>


                <div className='cartitems-total'>
                    <h2>CART TOTALS</h2>
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
                    <div className="paymentoptions">
                        <h2>PAYMENT METHOD</h2>
                        <div className="options">
                            <div className="razorpaygateway">
                                <input type="radio" name='paymentMethod' id='razorpay' value="razorpay" checked={paymentMethod === "razorpay"} onChange={(e) => setPaymentMethod(e.target.value)} />
                                <label for="razorpay"> RAZORPAY</label>
                            </div>
                            <div className="codgateway">
                                <input type="radio" name='paymentMethod' id='cod' value="cod" checked={paymentMethod === "cod"} onChange={(e) => setPaymentMethod(e.target.value)} />
                                <label for="cod"> CASH ON DELIVERY</label>
                            </div>
                        </div>
                        <button className='orderbtn' onClick={ handleplaceorderbtn }>PLACE ORDER</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
