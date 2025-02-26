import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Worker from "../../models/Worker.js";
import Store from "../../models/Store.js";

export const loginWorker = async (req, res) => {
  try {
    const { email, password } = req.body;

    const worker = await Worker.findOne({ email });
    if (!worker) return res.status(404).json({ error: "Worker not found" });

    const store = await Store.findById(worker.storeId);
    if (!store) return res.status(403).json({ error: "Store not found. Access denied!" });

    const isMatch = await bcrypt.compare(password, worker.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: worker._id, role: worker.role, storeId: worker.storeId },
      "your_jwt_secret",
      { expiresIn: "1d" }
    );

    res.cookie("workerToken", token, { httpOnly: true });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
