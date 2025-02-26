import Worker from "../../models/Worker.js";

export const getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
