import Store from "../../models/Store.js";

export const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;
    const ownerId = req.owner.id;
    const store = await Store.findById(id);

    if (!store) return res.status(404).json({ message: "Store not found" });

    if (store.ownerId !== ownerId) {
      return res.status(403).json({ message: "Unauthorized to delete this store" });
    }

    await Store.findByIdAndDelete(id);
    res.status(200).json({ message: "Store deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting store", error });
  }
};
