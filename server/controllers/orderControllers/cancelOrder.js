import Order from "../../models/Order.js";

/**
 * Controller for canceling an order.
 */
const cancelOrder = async (req, res) => {
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

    // Check if the order is in a cancelable state
    if (!["Order Received", "Order Confirmed"].includes(order.orderStatus)) {
      return res.status(400).json({ message: "Order cannot be canceled at this stage." });
    }

    // Update status to "Order Canceled"
    order.orderStatus = "Order Canceled";
    await order.save();

    return res.status(200).json({
      message: "Order has been canceled successfully.",
      order,
    });
  } catch (error) {
    console.error("Error canceling order:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default cancelOrder;
