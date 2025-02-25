import express from "express";
import {
  createMenuItemController,
  getAllMenuItemsController,
  getMenuItemByIdController,
  getMenuItemImageController,
  updateMenuItemController,
  deleteMenuItemController,
} from "../controllers/menuControllers/menuController.js";
import { convertToObjectId } from "../middlewares/convertToObjectId.js";
import multer from "multer";

const upload = multer(); // Using memory storage for image processing

export const menuRouter = express.Router();

menuRouter.post("/", upload.single("picture"), createMenuItemController); // Create menu item
menuRouter.get("/store/:storeId", convertToObjectId, getAllMenuItemsController); // Get all menu items for a store
menuRouter.get("/:_id", convertToObjectId, getMenuItemByIdController); // Get menu item by ID
menuRouter.get("/:_id/image", convertToObjectId, getMenuItemImageController); // Get menu item image
menuRouter.put("/:_id", convertToObjectId, upload.single("picture"), updateMenuItemController); // Update menu item
menuRouter.delete("/:_id", convertToObjectId, deleteMenuItemController); // Delete menu item
