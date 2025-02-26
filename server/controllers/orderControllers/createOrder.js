import Order from "../../models/Order.js";
import Menu from "../../models/Menu.js";

/**
 * Controller for creating a new order.
 */
const createOrder = async (req, res) => {
  try {
    const { items, tableNo, storeId, workerId } = req.body; // Worker = Waiter

    // Validate inputs
    if (!items || !tableNo || !storeId || !workerId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate menu items exist
    const menuItems = await Menu.find({ _id: { $in: items }, storeId });

    if (menuItems.length !== items.length) {
      return res.status(400).json({ message: "Some menu items are invalid or unavailable." });
    }

    // Create the order
    const newOrder = new Order({
      orderStatus: "Order Received",
      items,
      tableNo,
      storeId,
      workerId,
    });

    await newOrder.save();

    return res.status(201).json({
      message: "Order placed successfully.",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default createOrder;
