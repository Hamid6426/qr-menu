import express from 'express';
import upload from "../middlewares/multer.js";
import { getStoresByOwner } from '../controllers/storeControllers/getStoresByOwner.js';
import { getStoreById } from '../controllers/storeControllers/getStoreById.js';
import { createStore } from '../controllers/storeControllers/createStore.js';
import { updateStore } from '../controllers/storeControllers/updateStore.js';
import { deleteStore } from '../controllers/storeControllers/deleteStore.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export const storeRouter = express.Router();

storeRouter.get("/owner", authMiddleware, getStoresByOwner);
storeRouter.get("/:id", getStoreById);
storeRouter.post("/", authMiddleware, upload.single("storeThumbnail"), createStore);
storeRouter.put("/:id", authMiddleware, upload.single("storeThumbnail"), updateStore);
storeRouter.delete("/:id", authMiddleware, deleteStore);