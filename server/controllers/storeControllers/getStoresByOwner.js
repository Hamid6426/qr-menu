import Store from "../../models/Store.js";

export const getStoresByOwner = async (req, res) => {
  try {
    const ownerId = req.owner.id;
    const stores = await Store.find({ ownerId });

    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: "Error fetching owner's stores", error });
  }
};
