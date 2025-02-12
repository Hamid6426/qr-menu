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
    items: [{ type: String, ref: "Menu" }],
    tableNo: { type: Number, required: true },
    ownerId: { type: String, required: true, ref: 'Owner' },
    storeId: { type: String, required: true, ref: 'Store' },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
