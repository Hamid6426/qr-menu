import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
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
    tableNo: { type: Number, required: true },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;