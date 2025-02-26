import Order from "../../models/Order.js";

// Controller to view the status of an order.

const viewOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Validate orderId
    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required." });
    }

    // Find order by orderId
    const order = await Order.findOne({ orderId }).select("orderStatus items tableNo");

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    return res.status(200).json({
      message: "Order status retrieved successfully.",
      order,
    });
  } catch (error) {
    console.error("Error fetching order status:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default viewOrderStatus;
