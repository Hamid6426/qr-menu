import Worker from "../models/Worker.js";
import User from "../models/User.js"; // Assuming the User model exists
import bcrypt from "bcrypt";

// Create a new worker (Only Admins can do this)
export const createWorker = async (adminId, workerData) => {
  try {
    // Check if the requester is an admin
    const admin = await User.findById(adminId);
    if (!admin || admin.role !== "Admin") {
      throw new Error("Only admins can add workers.");
    }

    // Hash the worker's password
    workerData.password = await bcrypt.hash(workerData.password, 10);

    // Create the worker
    const newWorker = await Worker.create(workerData);
    return newWorker;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all workers of a store
export const getWorkersByStore = async (storeId) => {
  try {
    return await Worker.find({ storeId });
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get a worker by ID
export const getWorkerById = async (_id) => {
  try {
    return await Worker.findById(_id);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete a worker (Only Admins)
export const deleteWorker = async (adminId, _id) => {
  try {
    const admin = await User.findById(adminId);
    if (!admin || admin.role !== "Admin") {
      throw new Error("Only admins can delete workers.");
    }

    const worker = await Worker.findById(_id);
    if (!worker) throw new Error("Worker not found.");

    await Worker.findByIdAndDelete(_id);
    return { message: "Worker deleted successfully." };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update worker details (Only Admins)
export const updateWorker = async (adminId, _id, updateData) => {
  try {
    const admin = await User.findById(adminId);
    if (!admin || admin.role !== "Admin") {
      throw new Error("Only admins can update workers.");
    }

    // If updating password, hash it
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedWorker = await Worker.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedWorker) throw new Error("Worker not found.");
    return updatedWorker;
  } catch (error) {
    throw new Error(error.message);
  }
};
