import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  }
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [orderItemSchema],

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["razorpay", "cod"],
      required: true,
    },

    paymentId: {
      type: String,
    },

    orderId: {
      type: String,
    },

    deliveryAddress: {
      firstname: String,
      lastname: String,
      email: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
      phone: String,
    },

    status: {
      type: String,
      enum: ["Order Placed","Packing", "Shipped", "Out For Delivery", "Delivered"],
      default: "Order Placed",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
