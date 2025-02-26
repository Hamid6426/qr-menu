import Worker from "../../models/Worker";

export const deleteWorker = async (req, res) => {
    try {
      const { id } = req.params;
  
      const workerToDelete = await Worker.findById(id);
      if (!workerToDelete) return res.status(404).json({ error: "Worker not found" });
  
      // Ensure the owner is deleting their own worker
      if (req.owner.id !== workerToDelete.ownerId) {
        return res.status(403).json({ error: "Unauthorized! Only the owner can delete workers." });
      }
  
      await Worker.findByIdAndDelete(id);
      res.status(200).json({ message: "Worker deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  