import Store from "../../models/Store.js";
import Worker from "../../models/Worker.js";

export const getWorkersByStore = async (req, res) => {
  try {
    const { storeId } = req.params;

    const store = await Store.findById(storeId);
    if (!store) return res.status(404).json({ error: "Store not found" });

    const workers = await Worker.find({ storeId });
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
