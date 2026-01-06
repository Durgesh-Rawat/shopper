import { Order } from "../models/order.js";
import jwt from "jsonwebtoken";


export const adminorderget = async(req,res) => {
    try {
        const orders = await Order.find({ }).populate("user", "name email")
        .populate("items.product", "name new_price old_price price image").sort({ createdAt: -1 });
        console.log("userorder fetching");
        res.status(200).json(orders);
    } catch (err) {
        console.error('Failed to fetch orders:', err);
        res.status(500).json({ message: 'Error fetching orders' });
    }
}


export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};