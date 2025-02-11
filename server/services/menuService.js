import sharp from "sharp";
import Menu from "../models/Menu.js";

// Create a new menu item
export const createMenuItemService = async (menuData, file) => {
  if (!file) {
    throw new Error("Menu item must have a picture.");
  }

  const processedPicture = await sharp(file.buffer)
    .resize(300, 300) // Resize to 300x300 pixels
    .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
    .toBuffer();

  const menuItem = new Menu({
    itemName: menuData.itemName,
    description: menuData.description,
    price: menuData.price,
    picture: processedPicture,
    storeId: menuData.storeId,
  });

  await menuItem.save();
  return menuItem;
};

// Get all menu items of a store
export const getAllMenuItemsService = async (storeId) => {
  return await Menu.find({ storeId }).lean();
};

// Get a single menu item by ID
export const getMenuItemByIdService = async (_id) => {
  const menuItem = await Menu.findById(_id);
  if (!menuItem) {
    throw new Error("Menu item not found");
  }
  return menuItem;
};

// Update a menu item
export const updateMenuItemService = async (_id, menuData, file) => {
  const menuItem = await Menu.findById(_id);
  if (!menuItem) {
    throw new Error("Menu item not found");
  }

  if (file) {
    menuItem.picture = await sharp(file.buffer)
      .resize(300, 300)
      .jpeg({ quality: 80 })
      .toBuffer();
  }

  menuItem.itemName = menuData.itemName || menuItem.itemName;
  menuItem.description = menuData.description || menuItem.description;
  menuItem.price = menuData.price || menuItem.price;

  await menuItem.save();
  return menuItem;
};

// Delete a menu item
export const deleteMenuItemService = async (_id) => {
  const menuItem = await Menu.findByIdAndDelete(_id);
  if (!menuItem) {
    throw new Error("Menu item not found or already deleted");
  }
  return menuItem;
};
