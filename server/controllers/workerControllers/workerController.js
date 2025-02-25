import { 
  createWorkerService, 
  getAllWorkersService, 
  getWorkersByStoreService, 
  getWorkerByIdService 
} from "../../services/workerService.js";

// Create a new worker (Only Admins can do this)
export const createWorker = async (req, res) => {
  try {
    const adminId = req.user.id; // Assuming you have middleware to get the logged-in user
    const result = await createWorkerService(req.body, adminId);
    
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all workers for an admin
export const getAllWorkers = async (req, res) => {
  try {
    const adminId = req.user._id; // Assuming you have middleware to get the logged-in user
    const result = await getAllWorkersService(adminId);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all workers for a specific store
export const getWorkersByStore = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const result = await getWorkersByStoreService(storeId);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a worker by ID
export const getWorkerById = async (req, res) => {
  try {
    const { id } = req.params;
    const { storeId, adminId } = req.query; // Assuming storeId and adminId are passed as query parameters
    const result = await getWorkerByIdService(id, storeId, adminId);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
