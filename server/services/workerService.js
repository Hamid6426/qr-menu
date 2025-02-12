import Store from "../models/Store.js";
import Worker from "../models/Worker.js";
import bcrypt from "bcrypt";

// Create a new worker (Only Admins can do this)
export const createWorkerService = async (workerData, adminId) => {
  try {
    const { email, password, fullName, role, storeId } = workerData;

    // Validate input data (you can add more validation logic as needed)
    if (!email || !password || !fullName || !role || !storeId) {
      throw new Error("Missing required fields");
    }

    // Check if the store exists
    const store = await Store.findById(storeId);
    if (!store) {
      throw new Error("Store not found");
    }

    // Check if the user is the admin of the store
    if (store.adminId.toString() !== adminId.toString()) {
      throw new Error("User is not the admin of this store");
    }

    // Check if the email is already in use
    const existingWorker = await Worker.findOne({ email });
    if (existingWorker) {
      throw new Error("Email is already in use");
    }

    // Create new worker
    const newWorker = new Worker({
      email,
      password: await bcrypt.hash(password, 10), // Hashing password here
      fullName,
      role,
      storeId,
      adminId,
    });

    // Save the worker to the database
    await newWorker.save();

    return {
      success: true,
      message: "Worker created successfully",
      worker: newWorker,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAllWorkersService = async (adminId) => {
  try {
    // Retrieve all workers where the adminId matches
    const workers = await Worker.find({ adminId });

    return {
      success: true,
      workers,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getWorkersByStoreService = async (storeId) => {
  try {
    // Retrieve all workers where the storeId matches
    const workers = await Worker.find({ storeId });

    return {
      success: true,
      workers,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getWorkerByIdService = async (_id, storeId, adminId) => {
  try {
    // Step 1: Verify the store belongs to the admin
    const store = await Store.findOne({ _id: storeId, adminId });
    if (!store) {
      throw new Error("Store not found or doesn't belong to this admin");
    }

    // Step 2: Fetch the worker from this store
    const worker = await Worker.findOne({ _id, storeId });
    if (!worker) {
      throw new Error("Worker not found in this store");
    }

    return {
      success: true,
      worker,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
