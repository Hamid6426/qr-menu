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
import { convertToObjectId } from "../middlewares/convertToObjectId.js";

export const storeRouter = express.Router();

storeRouter.post("/create", upload.single("storeThumbnail"), createStoreController);
storeRouter.get('/', getAllStoresController);
storeRouter.get('/:_id', convertToObjectId, getStoreByIdController);
storeRouter.put("/:_id", convertToObjectId, upload.single("storeThumbnail"), updateStoreController);
storeRouter.delete('/:_id', convertToObjectId, deleteStoreController);
storeRouter.get("/:_id/image", convertToObjectId, getStoreImage);