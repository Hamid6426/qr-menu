const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OrderList = require("../models/Order");
const SALT_ROUNDS = +process.env.SALT_ROUNDS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Create Order
exports.addNewOrder = async (req, res) => {
  try {
    const { orderedItems, store, user } = req.body;
    const totalPrice = orderedItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
    const newOrder = new OrderList({
      orderedItems,
      store,
      user,
      totalPrice,
    });
    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", data: newOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

// Get All Store Orders
exports.getAllStoreOrders = async (req, res) => {
  try {
    const storeId = req.params.store; // Get store ID from route params
    const orders = await OrderList.find({ store: storeId }); // Filter orders by store
    res.status(200).json({ message: "Store orders retrieved successfully", data: orders });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving store orders", error: error.message });
  }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await OrderList.findByIdAndDelete(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting order", error: error.message });
  }
};

// Update Order Status
exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    const validStatuses = ["pending", "preparing", "completed"];
    if (!validStatuses.includes(status))
      return res.status(400).json({ message: "Invalid status value" });
    const order = await OrderList.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating order status", error: error.message });
  }
};
