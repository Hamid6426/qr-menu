import {
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
  deleteOrderService,
} from "../../services/orderService.js";

// Create a new order
export const createOrderController = async (req, res) => {
  try {
    const order = await createOrderService(req.body);
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders for a store
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await getAllOrdersService(req.params.storeId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an order by ID
export const getOrderByIdController = async (req, res) => {
  try {
    const order = await getOrderByIdService(req.params._id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status
export const updateOrderStatusController = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const updatedOrder = await updateOrderStatusService(req.params._id, orderStatus);
    res.status(200).json({ message: "Order status updated successfully", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an order
export const deleteOrderController = async (req, res) => {
  try {
    const deletedOrder = await deleteOrderService(req.params._id);
    res.status(200).json({ message: "Order deleted successfully", deletedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
