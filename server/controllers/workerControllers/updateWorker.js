import Worker from "../../models/Worker.js";

export const updateWorker = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      const worker = await Worker.findById(id);
      if (!worker) return res.status(404).json({ error: "Worker not found" });
  
      // Only Managers or Owners can update workers
      if (req.worker.role !== "Manager" && req.worker.role !== "Owner") {
        return res.status(403).json({ error: "Access denied!" });
      }
  
      // Prevent storeId modification
      if (updates.storeId) {
        return res.status(403).json({ error: "Cannot change store assignment!" });
      }
  
      // Hash password if updated
      if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
      }
  
      const updatedWorker = await Worker.findByIdAndUpdate(id, updates, { new: true });
  
      res.status(200).json(updatedWorker);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  