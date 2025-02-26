import Worker from "../../models/Worker.js";

export const getWorkersByOwner = async (req, res) => {
    try {
      const ownerId = req.owner.id;
      const workers = await Worker.find({ ownerId });
  
      res.status(200).json(workers);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  