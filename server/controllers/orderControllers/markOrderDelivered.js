import Order from "../../models/Order.js";

/**
 * Controller for waiters to mark an order as delivered to the customer.
 */
const markOrderDelivered = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { workerId } = req.body; // Waiter's ID

    // Validate inputs
    if (!orderId || !workerId) {
      return res.status(400).json({ message: "Order ID and worker ID are required." });
    }

    // Find the order
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Check if the order is in the correct state to be updated
    if (order.orderStatus !== "Ready for Pickup") {
      return res.status(400).json({ message: "Order is not ready for pickup and cannot be marked as delivered." });
    }

    // Update status to "Order Delivered"
    order.orderStatus = "Order Delivered";
    await order.save();

    return res.status(200).json({
      message: "Order marked as delivered.",
      order,
    });
  } catch (error) {
    console.error("Error marking order as delivered:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default markOrderDelivered;
