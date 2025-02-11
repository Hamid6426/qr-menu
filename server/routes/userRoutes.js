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
userRouter.get("/:_id", getUserById);
userRouter.put("/:_id", updateUser);
userRouter.patch("/:_id", patchUser);
userRouter.delete("/:_id", deleteUser);
userRouter.put("/:_id/change-password", changePassword);