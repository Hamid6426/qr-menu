import Store from "../../models/Store.js";
import sharp from "sharp";

export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const ownerId = req.owner.id;
    const store = await Store.findById(id);

    if (!store) return res.status(404).json({ message: "Store not found" });

    if (store.ownerId !== ownerId) {
      return res.status(403).json({ message: "Unauthorized to update this store" });
    }

    if (req.file) {
      req.body.storeThumbnail = await sharp(req.file.buffer).resize(300, 300).toBuffer();
    }

    const updatedStore = await Store.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedStore);
  } catch (error) {
    res.status(500).json({ message: "Error updating store", error });
  }
};
