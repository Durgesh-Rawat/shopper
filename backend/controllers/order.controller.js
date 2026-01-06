import mongoose from "mongoose";
import { Order } from "../models/order.js";

export const order = async (req, res) => {
    console.log("🛬 Order save request received");
    console.log("👤 From user:", req.user.id);
    console.log("📦 Order body:", req.body);

    try {

        console.log('📦 Received order payload:', req.body);

        const { items, totalAmount,paymentMethod, paymentId, orderId, deliveryAddress } = req.body;

        console.log('❌ Missing fields in order:', { items, totalAmount,paymentMethod, paymentId, orderId, deliveryAddress});

        const order = new Order({
            user: req.user.id,
            items,
            totalAmount,
            paymentMethod,
            paymentId,
            orderId,
            deliveryAddress,
            status: 'Order Placed',
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error('Order save failed:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const getorder = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("items.product").sort({ createdAt: -1 });
    console.log("userorder fetching");
    res.status(200).json(orders);
  } catch (err) {
    console.error('Failed to fetch orders:', err);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};