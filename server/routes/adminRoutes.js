import express from "express";
import { registerAdmin } from "../controllers/adminControllers/registerAdmin.js";
import { verifyAdmin } from "../controllers/adminControllers/verifyAdmin.js";
import { loginAdmin } from "../controllers/adminControllers/loginAdmin.js";
import { logoutAdmin } from "../controllers/adminControllers/logoutAdmin.js";
import { authAdminMiddleware } from "../middlewares/authMiddleware.js";
import { getAllOwners } from "../controllers/adminControllers/getAllOwners.js";
import { updateOwnerStatus } from "../controllers/adminControllers/updateOwnerStatus.js";

export const adminRouter = express.Router();

// Owner Auth Routes
adminRouter.post("/register", registerAdmin);
adminRouter.post("/verify", verifyAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", logoutAdmin);

adminRouter.get("/owners", authAdminMiddleware, getAllOwners);
adminRouter.put("/owners/:ownerId/status", authAdminMiddleware, updateOwnerStatus);