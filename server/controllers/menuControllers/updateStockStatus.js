import Menu from "../../models/Menu.js";

/**
 * Controller to update stock status of a menu item.
 */
const updateStockStatus = async (req, res) => {
  try {
    const { menuId } = req.params;
    const { stockStatus } = req.body;

    if (!menuId || !stockStatus) {
      return res.status(400).json({ message: "Menu ID and stock status are required." });
    }

    // Ensure stock status is valid
    if (!["In Stock", "Out of Stock"].includes(stockStatus)) {
      return res.status(400).json({ message: "Invalid stock status. Use 'In Stock' or 'Out of Stock'." });
    }

    // Find and update the menu item
    const updatedMenuItem = await Menu.findByIdAndUpdate(
      menuId,
      { stockStatus },
      { new: true }
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    return res.status(200).json({
      message: "Stock status updated successfully.",
      menuItem: updatedMenuItem,
    });
  } catch (error) {
    console.error("Error updating stock status:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default updateStockStatus;
