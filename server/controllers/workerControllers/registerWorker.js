import Store from "../../models/Store.js";
import Worker from "../../models/Worker.js";

export const registerWorker = async (req, res) => {
    try {
      const { email, password, fullName, role, storeId } = req.body;
      const ownerId = req.owner.id;
  
      // Ensure store exists and belongs to this owner
      const store = await Store.findOne({ _id: storeId, ownerId });
      if (!store) return res.status(403).json({ error: "Store not found or unauthorized!" });
  
      const existingWorker = await Worker.findOne({ email });
      if (existingWorker) return res.status(400).json({ error: "Worker already exists" });
  
      const worker = new Worker({ email, password, fullName, role, storeId, ownerId });
      await worker.save();
  
      res.status(201).json(worker);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  