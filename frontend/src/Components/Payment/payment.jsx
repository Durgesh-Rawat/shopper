import { backendUrl } from '../../config'
import axios from "axios";
import { toast } from 'react-toastify';



export const payment = async (amount, cartItems, setCartItems, paymentMethod, deliveryAddress, navigate) => {
   

    if (paymentMethod === "razorpay") {

        try {
            // Step 1: Create order from backend
            const order = await axios.post(`${backendUrl}/api/payment/createorder`, {
                amount,
            });

            // Step 2: Setup Razorpay options
            const options = {
                key: 'rzp_test_VCS4f4cNdcSMFt', // Razorpay Key ID (not secret)
                amount: order.data.amount,
                currency: order.data.currency,
                name: 'Durgesh E-Commerce Store',
                description: 'Purchase from store',
                order_id: order.data.id,
                handler: async function (response) {
                    // Step 3: Call backend to verify payment
                    try {
                        const verifyRes = await axios.post(`${backendUrl}/api/payment/verify`, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        if (verifyRes.data.status === 'success') {
                            toast.success('✅ Payment verified and successful!');

                            try {

                                const orderRes = await fetch(`${backendUrl}/api/orderuser/order`, {
                                    method: 'POST',
                                    headers: {
                                        "Content-Type": "application/json",
                                        "auth-token": localStorage.getItem('auth-token'),
                                    },
                                    body: JSON.stringify({
                                        items: cartItems,
                                        totalAmount: amount,
                                        paymentMethod: paymentMethod,
                                        paymentId: response.razorpay_payment_id,
                                        orderId: response.razorpay_order_id,
                                        deliveryAddress: deliveryAddress,
                                    }),
                                });


                                if (orderRes.ok) {
                                    toast.success("Order Placed Successfully")
                                    setCartItems([]);
                                    navigate('/order');
                                } else {
                                     toast.error('❌ Failed to save order');
                                }
                            } catch (err) {
                                console.error('Order save error:', err);
                                toast.error('❌ Could not save order to database');
                            }
                        }
                        else {
                            toast.error('❌ Payment verification failed');
                        }
                    } catch (err) {
                        console.error("Verification error", err);
                        toast.error("Error verifying payment.");
                    }
                },
                prefill: {
                    name: 'John Doe',
                    email: 'john@example.com',
                    contact: '9999999999',
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Payment initiation failed:", error);
            toast.error("Failed to initiate payment.");
        }
    }
    else {

        try {

            const orderRes = await fetch(`${backendUrl}/api/orderuser/order`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('auth-token'),
                },
                body: JSON.stringify({
                    items: cartItems,
                    totalAmount: amount,
                    paymentMethod: paymentMethod,
                    deliveryAddress: deliveryAddress,
                    status: "Order Placed",  
                })
            });

            if (orderRes.ok) {
                toast.success("Order Placed Successfully");
                setCartItems([]);
                navigate('/order');
            } else {
                toast.error('❌ Failed to save order');
            }
        }catch(err) {
            console.error('Order save error:', err);
            toast.error('❌ Could not save order to database');
        }
   }
}
