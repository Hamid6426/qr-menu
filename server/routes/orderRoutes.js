import express from "express";
import placeOrder from "../controllers/orderControllers/placeOrder.js";
import viewOrderStatus from "../controllers/orderControllers/viewOrderStatus.js";
import updateOrderStatus from "../controllers/orderControllers/updateOrderStatus.js";
import cancelOrder from "../controllers/orderControllers/cancelOrder.js";
import markOrderDelivered from "../controllers/orderControllers/markOrderDelivered.js";
import markOrderComplete from "../controllers/orderControllers/markOrderComplete.js";

export const orderRouter = express.Router();

// Order Routes
orderRouter.post("/place", placeOrder); // Customer places an order via waiter
orderRouter.get("/status/:orderId", viewOrderStatus); // View order status
orderRouter.patch("/update-status/:orderId", updateOrderStatus); // Update order status (Waiter/Cook)
orderRouter.patch("/cancel/:orderId", cancelOrder); // Cancel order (Waiter before preparation)
orderRouter.patch("/mark-delivered/:orderId", markOrderDelivered); // Mark order as delivered (Waiter)
orderRouter.patch("/mark-complete/:orderId", markOrderComplete); // Mark order as complete (System or Admin)