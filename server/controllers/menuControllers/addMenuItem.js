import Menu from "../../models/Menu.js";

/**
 * Controller to add a new menu item with an image.
 */
const addMenuItem = async (req, res) => {
  try {
    const { itemName, itemDescription, itemCategory, itemPrice, storeId, stockStatus } = req.body;
    const itemPicture = req.file?.buffer; // Get the uploaded image buffer

    if (!itemName || !itemDescription || !itemCategory || !itemPrice || !storeId || !itemPicture) {
      return res.status(400).json({ message: "All fields, including an image, are required." });
    }

    const newMenuItem = new Menu({
      itemName,
      itemDescription,
      itemCategory,
      itemPrice,
      itemPicture, // Save image as Buffer
      stockStatus: stockStatus || "In Stock",
      storeId,
    });

    await newMenuItem.save();

    return res.status(201).json({ message: "Menu item added successfully.", menuItem: newMenuItem });
  } catch (error) {
    console.error("Error adding menu item:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default addMenuItem;
