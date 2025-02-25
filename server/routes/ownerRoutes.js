import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { convertToObjectId } from "../middlewares/convertToObjectId.js";
import { registerOwner } from "../controllers/ownerControllers/registerOwner.js";
import { verifyEmail } from "../controllers/ownerControllers/verifyEmail.js";
import { resendCode } from "../controllers/ownerControllers/resendCode.js";
import { loginOwner } from "../controllers/ownerControllers/loginOwner.js";

export const ownerRouter = express.Router();

// Owner Auth Routes
ownerRouter.post("/register", registerOwner);
ownerRouter.post("/verify-email", verifyEmail);
ownerRouter.post("/resend-code", resendCode);
ownerRouter.post("/login", loginOwner);
// ownerRouter.post("/forgot-password", forgotPasswordController);
// ownerRouter.put("/:_id/change-password", convertToObjectId, changePasswordController);
// ownerRouter.post("/logout", authMiddleware, logoutController);

// // Other Routes
// ownerRouter.get("/", getAllOwnersController);
// ownerRouter.get("/profile", profileController);
// ownerRouter.get("/:_id", convertToObjectId, getOwnerByIdController);
// ownerRouter.put("/:_id", convertToObjectId, updateOwnerController);
// ownerRouter.patch("/:_id", convertToObjectId, patchOwnerController);
// ownerRouter.delete("/:_id", convertToObjectId, deleteOwnerController);
