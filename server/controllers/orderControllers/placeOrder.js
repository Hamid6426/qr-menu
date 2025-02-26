import Order from "../../models/Order.js";

// Controller to place a new order (handled by a waiter on behalf of a customer).
const placeOrder = async (req, res) => {
  try {
    const { items, tableNo, storeId, workerId } = req.body;

    // Validate required fields
    if (!items || !tableNo || !storeId || !workerId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new order with default status
    const newOrder = new Order({
      items,
      tableNo,
      storeId,
      workerId,
      orderStatus: "Order Received",
    });

    // Save to database
    await newOrder.save();

    return res.status(201).json({
      message: "Order placed successfully.",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default placeOrder;
