import express from "express";
import { verifyEmail, register, login, forgotPassword, logout, resendCode } from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/resend-code", resendCode);
authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/logout", authenticateToken, logout); 