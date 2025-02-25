import {
  createStoreService,
  getAllStoresService,
  getStoreByIdService,
  updateStoreService,
  deleteStoreService,
} from "../../services/storeService.js";

// Create a new store
export const createStoreController = async (req, res) => {
  try {
    const store = await createStoreService(req.body, req.file);
    res.status(201).json({ message: "Store created successfully", store });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all stores
export const getAllStoresController = async (req, res) => {
  try {
    const stores = await getAllStoresService();

    const storesWithImageUrl = stores.map(store => ({
      ...store,
      storeThumbnail: store.storeThumbnail
        ? `data:image/jpeg;base64,${store.storeThumbnail.toString("base64")}`
        : null
    }));

    res.status(200).json(storesWithImageUrl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a store by _id
export const getStoreByIdController = async (req, res) => {
  try {
    const store = await getStoreByIdService(req.params._id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get store image
export const getStoreImageController = async (req, res) => {
  try {
    const store = await Store.findById(req.params._id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }
    if (!store.storeThumbnail) {
      return res.status(404).json({ message: "Store exists but has no image" });
    }

    res.set("Content-Type", "image/jpeg");
    res.send(store.storeThumbnail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a store
export const updateStoreController = async (req, res) => {
  try {
    const store = await updateStoreService(req.params._id, req.body, req.file);
    res.status(200).json({ message: "Store updated successfully", store });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a store
export const deleteStoreController = async (req, res) => {
  try {
    console.log("Delete request received for store ID:", req.params._id);

    const deletedStore = await deleteStoreService(req.params._id);
    res.status(200).json({ message: "Store deleted successfully", deletedStore });
  } catch (error) {
    console.error("Error deleting store:", error);
    res.status(500).json({ message: error.message });
  }
};
