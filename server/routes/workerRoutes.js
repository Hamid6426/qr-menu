import express from "express";
import { createWorker, getAllWorkers, getWorkersByStore, getWorkerById } from "../controllers/workerControllers/workerController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const workerRouter = express.Router();

workerRouter.use(authMiddleware);

workerRouter.post("/create", createWorker);
workerRouter.get("/admin", getAllWorkers);
workerRouter.get("/store/:storeId", getWorkersByStore);
workerRouter.get("/:id", getWorkerById);