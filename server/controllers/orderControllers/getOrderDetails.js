import Order from "../models/Order.js";

const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Fetch order and populate menu items automatically
    const order = await Order.findById(orderId).populate("items"); 

    if (!order) return res.status(404).json({ message: "Order not found" });

    return res.status(200).json({ order });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
