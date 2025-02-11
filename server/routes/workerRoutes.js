import express from "express";
import {
  workerRegisterController,
  workerLoginController,
  getWorkerByIdController,
  getAllWorkersController,
  deleteWorkerByIdController,
} from "../controllers/workerController.js";
import { convertToObjectId } from "../middlewares/convertToObjectId.js";

export const workerRouter = express.Router();

workerRouter.post("/register", workerRegisterController); // Admins only
workerRouter.post("/login", workerLoginController);
workerRouter.get("/store/:storeId", convertToObjectId, getAllWorkersController); // Get all workers in a store
workerRouter.get("/:_id", convertToObjectId, getWorkerByIdController);
workerRouter.delete("/:_id", convertToObjectId, deleteWorkerByIdController); // Admins only
