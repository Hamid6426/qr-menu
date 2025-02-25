import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { convertToObjectId } from "../middlewares/convertToObjectId.js";
import { registerOwner } from "../controllers/ownerControllers/registerOwner.js";
import { verifyEmail } from "../controllers/ownerControllers/verifyEmail.js";
import { resendCode } from "../controllers/ownerControllers/resendCode.js";
import { loginOwner } from "../controllers/ownerControllers/loginOwner.js";
import { logoutOwner } from "../controllers/ownerControllers/logoutOwner.js";
import { forgotPassword } from "../controllers/ownerControllers/forgotPassword.js";
import { resetPassword } from "../controllers/ownerControllers/resetPassword.js";

import { getOwnerById } from "../controllers/ownerControllers/getOwnerById.js";
import { updateOwner } from "../controllers/ownerControllers/updateOwner.js";
import { changePassword } from "../controllers/ownerControllers/changePassword.js";

export const ownerRouter = express.Router();

// Owner Auth Routes
ownerRouter.post("/register", registerOwner);
ownerRouter.post("/verify-email", verifyEmail);
ownerRouter.post("/resend-code", resendCode);
ownerRouter.post("/login", loginOwner);
ownerRouter.post("/logout", logoutOwner);
ownerRouter.post("/forgot-password", forgotPassword);
ownerRouter.post("/reset-password", resetPassword);

ownerRouter.get("/get-owner", authMiddleware, getOwnerById);
ownerRouter.put("/update-owner", authMiddleware, updateOwner);
ownerRouter.put("/change-password", authMiddleware, changePassword);

// // Other Routes
// ownerRouter.get("/", getAllOwnersController);
// ownerRouter.get("/profile", profileController);
// ownerRouter.get("/:_id", convertToObjectId, getOwnerByIdController);
// ownerRouter.put("/:_id", convertToObjectId, updateOwnerController);
// ownerRouter.patch("/:_id", convertToObjectId, patchOwnerController);
// ownerRouter.delete("/:_id", convertToObjectId, deleteOwnerController);
