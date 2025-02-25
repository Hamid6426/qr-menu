import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const ownerSchema = new mongoose.Schema(
  {
    ownerId: { type: String, required: true, unique: true, default: () => uuidv4() },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    verificationCode: { type: String }, // Will be hashed before saving
    verificationExpires: { type: Date }, // Expiry time for verification
    isVerified: { type: Boolean, default: false }, // Track email verification
  },
  { timestamps: true }
);

const Owner = mongoose.model("Owner", ownerSchema);
export default Owner;
