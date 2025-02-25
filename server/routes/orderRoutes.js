import express from "express";
import {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderStatusController,
  deleteOrderController,
} from "../controllers/orderControllers/orderController.js";
import { convertToObjectId } from "../middlewares/convertToObjectId.js";

export const orderRouter = express.Router();

orderRouter.post("/", createOrderController); // Place a new order
orderRouter.get("/store/:storeId", convertToObjectId, getAllOrdersController); // Get all orders for a store
orderRouter.get("/:_id", convertToObjectId, getOrderByIdController); // Get order by ID
orderRouter.put("/:_id/status", convertToObjectId, updateOrderStatusController); // Update order status
orderRouter.delete("/:_id", convertToObjectId, deleteOrderController); // Delete order
