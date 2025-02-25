import express from 'express';
import {
  createStoreController,
  getAllStoresController,
  getStoreByIdController,
  updateStoreController,
  deleteStoreController,
  getStoreImageController
} from '../controllers/storeControllers/storeController.js'; 
import upload from "../middlewares/multer.js";
import { convertToObjectId } from "../middlewares/convertToObjectId.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"; // Import the auth middleware

export const storeRouter = express.Router();

// Protect these routes using authMiddleware
storeRouter.post("/create", authMiddleware, upload.single("storeThumbnail"), createStoreController);
storeRouter.put("/:_id", authMiddleware, convertToObjectId, upload.single("storeThumbnail"), updateStoreController);
storeRouter.delete("/:_id", authMiddleware, convertToObjectId, deleteStoreController);

// Public routes (if needed)
storeRouter.get('/', authMiddleware, getAllStoresController);
storeRouter.get('/:_id', authMiddleware, convertToObjectId, getStoreByIdController);
storeRouter.get("/:_id/image", authMiddleware, convertToObjectId, getStoreImageController);
