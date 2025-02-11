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
import { convertToObjectId } from "../middlewares/convertToObjectId.js";

export const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/profile", profile);
userRouter.get("/search", searchUsers);
userRouter.get("/:_id", convertToObjectId, getUserById);
userRouter.put("/:_id", convertToObjectId, updateUser);
userRouter.patch("/:_id", convertToObjectId, patchUser);
userRouter.delete("/:_id", convertToObjectId, deleteUser);
userRouter.put("/:_id/change-password", convertToObjectId, changePassword);
