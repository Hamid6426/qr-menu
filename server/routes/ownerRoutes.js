import {
  verifyEmailController,
  resendCodeController,
  registerOwnerController,
  loginController,
  logoutController,
  forgotPasswordController,
  getAllOwnersController,
  getOwnerByIdController,
  updateOwnerController,
  patchOwnerController,
  deleteOwnerController,
  changePasswordController,
  profileController,
  searchOwnersController,
} from "../controllers/ownerController.js";
import express from "express";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import { convertToObjectId } from "../middlewares/convertToObjectId.js";

export const ownerRouter = express.Router();

// Owner Auth Routes
ownerRouter.post("/register", registerOwnerController);
ownerRouter.post("/verify-email", verifyEmailController);
ownerRouter.post("/resend-code", resendCodeController);
ownerRouter.post("/login", loginController);
ownerRouter.post("/forgot-password", forgotPasswordController);
ownerRouter.post("/logout", authMiddleware, logoutController);

// Other Routes
ownerRouter.get("/", getAllOwnersController);
ownerRouter.get("/profile", profileController);
ownerRouter.get("/search", searchOwnersController);
ownerRouter.get("/:_id", convertToObjectId, getOwnerByIdController);
ownerRouter.put("/:_id", convertToObjectId, updateOwnerController);
ownerRouter.patch("/:_id", convertToObjectId, patchOwnerController);
ownerRouter.delete("/:_id", convertToObjectId, deleteOwnerController);
ownerRouter.put("/:_id/change-password", convertToObjectId, changePasswordController);
