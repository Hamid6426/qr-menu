import Order from "../../models/Order.js";

/**
 * Controller for cooks to mark an order as ready for pickup.
 */
const markReadyForPickup = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { workerId } = req.body; // Cook's ID

    // Validate inputs
    if (!orderId || !workerId) {
      return res
        .status(400)
        .json({ message: "Order ID and worker ID are required." });
    }

    // Find the order
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Check if the order is in the correct state to be updated
    if (order.orderStatus !== "Cooking in Progress") {
      return res
        .status(400)
        .json({
          message: "Order is not in progress and cannot be marked as ready.",
        });
    }

    // Update status to "Ready for Pickup"
    order.orderStatus = "Ready for Pickup";
    await order.save();

    return res.status(200).json({
      message: "Order marked as ready for pickup.",
      order,
    });
  } catch (error) {
    console.error("Error marking order as ready for pickup:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default markReadyForPickup;
