import Menu from "../../models/Menu.js";

/**
 * Controller to update a menu item, including optional image update.
 */
const updateMenuItem = async (req, res) => {
  try {
    const { menuId } = req.params;
    const updates = req.body;
    const newImage = req.file?.buffer; // Check if a new image is uploaded

    // Find existing menu item
    const menuItem = await Menu.findById(menuId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    // If a new image is uploaded, replace the existing one
    if (newImage) {
      updates.itemPicture = newImage;
    }

    // Update the menu item
    const updatedMenuItem = await Menu.findByIdAndUpdate(menuId, updates, { new: true });

    return res.status(200).json({
      message: "Menu item updated successfully.",
      menuItem: updatedMenuItem,
    });
  } catch (error) {
    console.error("Error updating menu item:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default updateMenuItem;
