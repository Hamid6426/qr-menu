import Order from "../../models/Order.js";

/**
 * Controller for cooks to view pending orders that need to be prepared.
 */
const viewPendingOrders = async (req, res) => {
  try {
    const { workerId } = req.params;

    // Validate workerId
    if (!workerId) {
      return res.status(400).json({ message: "Worker ID is required." });
    }

    // Find orders that are "Order Confirmed" (ready to be cooked)
    const orders = await Order.find({ orderStatus: "Order Confirmed" })
      .sort({ createdAt: -1 }) // Sort by latest orders first
      .select("orderId items tableNo createdAt");

    if (!orders.length) {
      return res.status(404).json({ message: "No pending orders found." });
    }

    return res.status(200).json({
      message: "Pending orders retrieved successfully.",
      orders,
    });
  } catch (error) {
    console.error("Error fetching pending orders:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default viewPendingOrders;
