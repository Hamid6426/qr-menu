import {
  createStoreService,
  getAllStoresService,
  getStoreByIdService,
  updateStoreService,
  deleteStoreService,
} from "../services/storeService.js";
import sharp from "sharp";
import Store from "../models/Store.js"; // Import your Store model

// Create a new store
export const createStoreController = async (req, res) => {
  try {
    // Check if the admin has already created 3 stores
    const storeCount = await Store.countDocuments({ adminId: req.body.adminId });
    if (storeCount >= 3) {
      return res.status(403).json({ message: "Limit reached: An admin can only create up to 3 stores." });
    }

    // Process Image with Sharp
    let storeThumbnail = null;
    if (req.file) {
      storeThumbnail = await sharp(req.file.buffer)
        .resize(300, 300) // Resize to 300x300 pixels
        .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
        .toBuffer();
    }

    // Create new store
    const store = new Store({
      storeThumbnail: storeThumbnail,
      storeName: req.body.storeName,
      description: req.body.description,
      address: req.body.address,
      storePhone: req.body.storePhone,
      storeEmail: req.body.storeEmail,
      storeWebsite: req.body.storeWebsite,
      adminId: req.body.adminId, // Ensure adminId is included
    });

    await store.save();
    res.status(201).json({ message: "Store created successfully", store });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all stores
export const getAllStoresController = async (req, res) => {
  try {
    const stores = await Store.find(); // Fetch all stores
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a store by ID
export const getStoreByIdController = async (req, res) => {
  try {
    const store = await Store.findById(req.params._id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    // If store has an image, send it as a response
    if (store.storeThumbnail) {
      res.set("Content-Type", "image/jpeg"); // Set content type
      return res.send(store.storeThumbnail); // Send image buffer as response
    }

    res.status(200).json(store); // Send store data if no image
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStoreImage = async (req, res) => {
  try {
    const store = await Store.findById(req.params._id);
    if (!store || !store.storeThumbnail) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.set("Content-Type", "image/jpeg"); // Set the correct content type
    res.send(store.storeThumbnail); // Send image buffer as response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a store
export const updateStoreController = async (req, res) => {
  try {
    const store = await Store.findById(req.params._id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    // Process Image if provided
    let storeThumbnail = store.storeThumbnail; // Keep old image if no new image is uploaded
    if (req.file) {
      storeThumbnail = await sharp(req.file.buffer)
        .resize(300, 300)
        .jpeg({ quality: 80 })
        .toBuffer();
    }

    // Update store fields
    store.storeName = req.body.storeName || store.storeName;
    store.description = req.body.description || store.description;
    store.address = req.body.address || store.address;
    store.storePhone = req.body.storePhone || store.storePhone;
    store.storeEmail = req.body.storeEmail || store.storeEmail;
    store.storeWebsite = req.body.storeWebsite || store.storeWebsite;
    store.storeThumbnail = storeThumbnail;

    await store.save();
    res.status(200).json({ message: "Store updated successfully", store });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a store
export const deleteStoreController = async (req, res) => {
  try {
    const store = await deleteStoreService(req.params._id);
    res.status(200).json(store);
  } catch (error) {
    console.error("Error deleting store:", error);
    res.status(500).json({ message: error.message });
  }
};
