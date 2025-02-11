import Worker from "../models/Worker.js";
import User from "../models/User.js"; // Assuming the User model exists
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createWorker, getWorkerById, getWorkersByStore, deleteWorker, updateWorker } from "../services/workerService.js";

// Worker Registration (Only Admins can register workers)
export const workerRegisterController = async (req, res) => {
  try {
    const adminId = req.user._id; // Assuming admin ID comes from auth middleware
    const newWorker = await createWorker(adminId, req.body);
    res.status(201).json(newWorker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Worker Login
export const workerLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const worker = await Worker.findOne({ email });

    if (!worker) return res.status(404).json({ error: "Worker not found." });

    const isMatch = await bcrypt.compare(password, worker.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials." });

    const token = jwt.sign({ _id: worker._id, role: worker.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ token, worker });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Worker by ID
export const getWorkerByIdController = async (req, res) => {
  try {
    const worker = await getWorkerById(req.params.id);
    if (!worker) return res.status(404).json({ error: "Worker not found." });
    res.status(200).json(worker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Workers of a Store
export const getAllWorkersController = async (req, res) => {
  try {
    const workers = await getWorkersByStore(req.params.storeId);
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Worker by ID (Only Admins)
export const deleteWorkerByIdController = async (req, res) => {
  try {
    const adminId = req.user._id; // Assuming admin ID comes from auth middleware
    const response = await deleteWorker(adminId, req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
