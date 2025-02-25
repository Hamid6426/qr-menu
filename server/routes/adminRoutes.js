import express from "express";
import { registerAdmin } from "../controllers/adminControllers/registerAdmin.js";
import { verifyAdmin } from "../controllers/adminControllers/verifyAdmin.js";
import { loginAdmin } from "../controllers/ownerControllers/loginOwner.js";
import { logoutAdMin } from "../controllers/ownerControllers/logoutOwner.js";

export const ownerRouter = express.Router();

// Owner Auth Routes
ownerRouter.post("/register", registerOwner);
ownerRouter.post("/verify-email", verifyEmail);
ownerRouter.post("/login", loginOwner);
ownerRouter.post("/logout", logoutOwner);