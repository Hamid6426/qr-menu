import Order from "../../models/Order.js";

/**
 * Controller for waiters to mark an order as complete.
 */
const markOrderComplete = async (req, res) => {
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
    if (order.orderStatus !== "Order Delivered") {
      return res.status(400).json({ message: "Order is not delivered yet and cannot be marked as complete." });
    }

    // Update status to "Order Complete"
    order.orderStatus = "Order Complete";
    await order.save();

    return res.status(200).json({
      message: "Order marked as complete.",
      order,
    });
  } catch (error) {
    console.error("Error marking order as complete:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default markOrderComplete;
