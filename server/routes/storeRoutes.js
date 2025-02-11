import express from 'express';
import {
  createStoreController,
  getAllStoresController,
  getStoreByIdController,
  updateStoreController,
  deleteStoreController,
  getStoreImage
} from '../controllers/storeController.js'; 
import upload from "../middlewares/multer.js";

export const storeRouter = express.Router();

storeRouter.post("/create", upload.single("storeThumbnail"), createStoreController);
storeRouter.get('/', getAllStoresController);
storeRouter.get('/:id', getStoreByIdController);
storeRouter.put("/:id", upload.single("storeThumbnail"), updateStoreController);
storeRouter.delete('/:id', deleteStoreController);
storeRouter.get("/:id/image", getStoreImage);