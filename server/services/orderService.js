import Order from "../models/Order.js";
import Menu from "../models/Menu.js";

// Create a new order
export const createOrderService = async (orderData) => {
  const { storeId, userId, tableNo, items } = orderData;

  // Ensure all menu items exist
  const menuItems = await Menu.find({ _id: { $in: items } });
  if (menuItems.length !== items.length) {
    throw new Error("One or more menu items do not exist");
  }

  const order = new Order({
    orderStatus: "Order Received",
    tableNo,
    storeId,
    userId,
    items,
  });

  await order.save();
  return order;
};

// Get all orders for a store
export const getAllOrdersService = async (storeId) => {
  return await Order.find({ storeId })
    .populate("userId", "fullName email")
    .populate("items", "itemName price")
    .lean();
};

// Get an order by ID
export const getOrderByIdService = async (_id) => {
  const order = await Order.findById(_id)
    .populate("userId", "fullName email")
    .populate("items", "itemName price");
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};

// Update order status
export const updateOrderStatusService = async (_id, newStatus) => {
  const order = await Order.findById(_id);
  if (!order) {
    throw new Error("Order not found");
  }

  if (!orderSchema.path("orderStatus").enumValues.includes(newStatus)) {
    throw new Error("Invalid order status");
  }

  order.orderStatus = newStatus;
  await order.save();
  return order;
};

// Delete an order
export const deleteOrderService = async (_id) => {
  const order = await Order.findByIdAndDelete(_id);
  if (!order) {
    throw new Error("Order not found or already deleted");
  }
  return order;
};
