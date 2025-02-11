  import mongoose from "mongoose";

  const storeSchema = new mongoose.Schema(
    {
      storeThumbnail: { type: Buffer },
      storeName: { type: String, required: true },
      description: { type: String, required: true },
      address: { type: String, required: true },
      storePhone: { type: String, required: true },
      storeEmail: { type: String, required: true },
      storeWebsite: { type: String },
      adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    { timestamps: true }
  );

  const Store = mongoose.model("Store", storeSchema);
  export default Store;