import Menu from "../../models/Menu.js";

/**
 * Controller to get all menu items for a store.
 */
const getMenuItems = async (req, res) => {
  try {
    const { storeId } = req.params;

    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required." });
    }

    const menuItems = await Menu.find({ storeId });

    // Convert image Buffer to Base64 for frontend display
    const menuItemsWithImages = menuItems.map(item => ({
      ...item.toObject(),
      itemPicture: item.itemPicture ? `data:image/png;base64,${item.itemPicture.toString("base64")}` : null,
    }));

    return res.status(200).json(menuItemsWithImages);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default getMenuItems;
