import Worker from "../../models/Worker.js";

export const getWorkerById = async (req, res) => {
    try {
      const { id } = req.params;
      const worker = await Worker.findById(id);
  
      if (!worker) return res.status(404).json({ error: "Worker not found" });
  
      // Ensure worker belongs to the same store
      if (req.worker.storeId !== worker.storeId) {
        return res.status(403).json({ error: "Access denied!" });
      }
  
      res.status(200).json(worker);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
