  import mongoose from "mongoose";

  const menuSchema = new mongoose.Schema(
    {
      itemName: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      picture: { type: Buffer, required: true },
      storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true },
    },
    { timestamps: true }
  );

  const Menu = mongoose.model("Menu", menuSchema);
  export default Menu;