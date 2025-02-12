import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const workerSchema = new mongoose.Schema(
  {
    workerId: { type: String, required: true, unique: true, default: uuidv4 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    role: { type: String, enum: ["Manager", "Cook", "Waiter"], required: true },
    storeId: { type: String, required: true, ref: 'Store' }, // Reference to Store
    ownerId: { type: String, required: true, ref: 'Owner' }, // Reference to Owner
  },
  { timestamps: true }
);

// Hash password before saving
workerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Worker = mongoose.model("Worker", workerSchema);
export default Worker;
