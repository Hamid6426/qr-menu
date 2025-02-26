import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { registerWorker } from "../controllers/workerControllers/registerWorker.js";
import { getWorkerById } from "../controllers/workerControllers/getWorkerById.js";
import { getWorkersByStore } from "../controllers/workerControllers/getWorkersByStore.js";

export const workerRouter = express.Router();

workerRouter.use(authMiddleware);

workerRouter.post("/create", registerWorker);
workerRouter.get("/store/:storeId", getWorkersByStore);
workerRouter.get("/:id", getWorkerById);