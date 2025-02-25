import {
  createMenuItemService,
  getAllMenuItemsService,
  getMenuItemByIdService,
  updateMenuItemService,
  deleteMenuItemService,
} from "../../services/menuService.js";

// Create a new menu item
export const createMenuItemController = async (req, res) => {
  try {
    const menuItem = await createMenuItemService(req.body, req.file);
    res.status(201).json({ message: "Menu item created successfully", menuItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all menu items for a store
export const getAllMenuItemsController = async (req, res) => {
  try {
    const menuItems = await getAllMenuItemsService(req.params.storeId);

    const menuItemsWithImageUrl = menuItems.map(item => ({
      ...item,
      picture: item.picture
        ? `data:image/jpeg;base64,${item.picture.toString("base64")}`
        : null
    }));

    res.status(200).json(menuItemsWithImageUrl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a menu item by ID
export const getMenuItemByIdController = async (req, res) => {
  try {
    const menuItem = await getMenuItemByIdService(req.params._id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get menu item image
export const getMenuItemImageController = async (req, res) => {
  try {
    const menuItem = await getMenuItemByIdService(req.params._id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    if (!menuItem.picture) {
      return res.status(404).json({ message: "Menu item exists but has no image" });
    }

    res.set("Content-Type", "image/jpeg");
    res.send(menuItem.picture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a menu item
export const updateMenuItemController = async (req, res) => {
  try {
    const menuItem = await updateMenuItemService(req.params._id, req.body, req.file);
    res.status(200).json({ message: "Menu item updated successfully", menuItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a menu item
export const deleteMenuItemController = async (req, res) => {
  try {
    const deletedMenuItem = await deleteMenuItemService(req.params._id);
    res.status(200).json({ message: "Menu item deleted successfully", deletedMenuItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
    