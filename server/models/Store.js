import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const storeSchema = new mongoose.Schema(
  {
    storeId: { type: String, required: true, unique: true, default: uuidv4 },
    storeThumbnail: { type: Buffer },
    storeName: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    storePhone: { type: String, required: true },
    storeEmail: { type: String, required: true },
    storeWebsite: { type: String },
    ownerId: { type: String, required: true, ref: 'Owner' }
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", storeSchema);
export default Store;
