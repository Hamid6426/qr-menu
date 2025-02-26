import Menu from "../../models/Menu.js";

/**
 * Controller to delete a menu item.
 */
const deleteMenuItem = async (req, res) => {
  try {
    const { menuId } = req.params;

    const deletedItem = await Menu.findByIdAndDelete(menuId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    return res.status(200).json({ message: "Menu item deleted successfully." });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default deleteMenuItem;
