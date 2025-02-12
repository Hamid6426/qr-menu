import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const menuSchema = new mongoose.Schema(
  {
    menuId: { type: String, required: true, unique: true, default: uuidv4 },
    itemName: { type: String, required: true },
    itemDescription: { type: String, required: true },
    itemCategory: { type: String, required: true }, // like pizzas, juices, or coffee, etc.
    itemPrice: { type: Number, required: true },
    itemPicture: { type: Buffer, required: true },
    storeId: { type: String, required: true, ref: 'Store' }, // Reference to Store
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
