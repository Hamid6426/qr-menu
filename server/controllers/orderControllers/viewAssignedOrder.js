import Order from "../../models/Order.js";

/**
 * Controller for waiters to view their assigned orders.
 */
const viewAssignedOrders = async (req, res) => {
  try {
    const { workerId } = req.params;

    // Validate workerId
    if (!workerId) {
      return res.status(400).json({ message: "Worker ID is required." });
    }

    // Find orders assigned to this worker (waiter)
    const orders = await Order.find({ workerId })
      .sort({ createdAt: -1 }) // Sort by latest orders first
      .select("orderId orderStatus items tableNo createdAt");

    if (!orders.length) {
      return res.status(404).json({ message: "No assigned orders found." });
    }

    return res.status(200).json({
      message: "Assigned orders retrieved successfully.",
      orders,
    });
  } catch (error) {
    console.error("Error fetching assigned orders:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default viewAssignedOrders;
