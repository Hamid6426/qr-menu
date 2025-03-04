import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true, default: uuidv4 },
    orderStatus: {
      type: String,
      enum: [
        "Order Received",
        "Order Confirmed",
        "Cooking in Progress",
        "Ready for Pickup",
        "Order Delivered",
        "Order Complete",
      ],
      required: true,
    },
    items: [
      {
        itemId: { type: String, ref: "Menu" },
        quantity: { type: Number, required: true },
        specialInstructions: { type: String },
        priceAtOrderTime: { type: Number, required: true }, // Store the price when the order was made
      }
    ], 
    tableNo: { type: Number, required: true },
    ownerId: { type: String, required: true, ref: "Owner" },
    storeId: { type: String, required: true, ref: "Store" },
    workerId: { type: String, required: true, ref: "Worker" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
