import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  patchUser,
  deleteUser,
  changePassword,
  profile,
  searchUsers,
} from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/profile", profile);
userRouter.get("/search", searchUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUser);
userRouter.patch("/:id", patchUser);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id/change-password", changePassword);