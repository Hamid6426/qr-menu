import Store from "../../models/Store.js";
import sharp from "sharp";

export const createStore = async (req, res) => {
  try {
    const ownerId = req.owner.id;
    const storeCount = await Store.countDocuments({ ownerId });

    if (storeCount >= 3) {
      return res.status(400).json({ message: "Owners can only have 3 stores" });
    }

    let storeThumbnail = null;
    if (req.file) {
      storeThumbnail = await sharp(req.file.buffer).resize(300, 300).toBuffer();
    }

    const newStore = new Store({
      storeName: req.body.storeName,
      description: req.body.description,
      address: req.body.address,
      storePhone: req.body.storePhone,
      storeEmail: req.body.storeEmail,
      storeWebsite: req.body.storeWebsite,
      ownerId,
      storeThumbnail,
    });

    await newStore.save();
    res.status(201).json(newStore);
  } catch (error) {
    res.status(500).json({ message: "Error creating store", error });
  }
};
