import express from "express";
import multer from "multer";
import addMenuItem from "../controllers/menuControllers/addMenuItem.js";
import getMenuItems from "../controllers/menuControllers/getMenuItems.js";
import updateMenuItem from "../controllers/menuControllers/updateMenuItem.js";
import deleteMenuItem from "../controllers/menuControllers/deleteMenuItem.js";
import updateStockStatus from "../controllers/menuControllers/updateStockStatus.js";

export const menuRouter = express.Router();
const upload = multer();  

// Menu Item Routes
menuRouter.post("/add", upload.single("itemPicture"), addMenuItem); // Add menu item with image
menuRouter.get("/:storeId", getMenuItems); // Get all menu items for a store
menuRouter.patch("/update/:menuId", upload.single("itemPicture"), updateMenuItem); // Update menu item details and image
menuRouter.delete("/delete/:menuId", deleteMenuItem); // Delete menu item
menuRouter.patch("/update-stock/:menuId", updateStockStatus); // Update stock status (In Stock / Out of Stock)
