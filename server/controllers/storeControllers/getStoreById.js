import Store from "../../models/Store.js";

export const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findById(id);

    if (!store) return res.status(404).json({ message: "Store not found" });

    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: "Error fetching store", error });
  }
};
