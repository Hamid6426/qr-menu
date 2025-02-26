import Order from "../../models/Order.js";

/**
 * Controller to update order status (handled by waiters & cooks).
 */
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { newStatus, workerId } = req.body;

    // Validate required fields
    if (!orderId || !newStatus || !workerId) {
      return res.status(400).json({ message: "Order ID, new status, and worker ID are required." });
    }

    // Find the order
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Define valid status transitions
    const statusFlow = [
      "Order Received",
      "Order Confirmed",
      "Cooking in Progress",
      "Ready for Pickup",
      "Order Delivered",
      "Order Complete",
    ];

    const currentIndex = statusFlow.indexOf(order.orderStatus);
    const newIndex = statusFlow.indexOf(newStatus);

    // Check if status update is valid
    if (newIndex === -1 || newIndex !== currentIndex + 1) {
      return res.status(400).json({ message: "Invalid status transition." });
    }

    // Update status
    order.orderStatus = newStatus;
    await order.save();

    return res.status(200).json({
      message: "Order status updated successfully.",
      order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default updateOrderStatus;