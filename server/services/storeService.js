import Store from "../models/Store.js";

// Create a new store
export const createStoreService = async (storeData) => {
  try {
    const store = new Store(storeData);
    await store.save();
    return store;
  } catch (error) {
    throw new Error("Error creating store: " + error.message);
  }
};

// Retrieve all stores
export const getAllStoresService = async () => {
  try {
    const stores = await Store.find();
    return stores;
  } catch (error) {
    throw new Error("Error retrieving stores: " + error.message);
  }
};

// Retrieve a store by ID
export const getStoreByIdService = async (id) => {
  try {
    const store = await Store.findById(id);
    if (!store) {
      throw new Error("Store not found");
    }
    return store;
  } catch (error) {
    throw new Error("Error retrieving store: " + error.message);
  }
};

// Update a store
export const updateStoreService = async (id, storeData) => {
  try {
    const store = await Store.findByIdAndUpdate(id, storeData, { new: true });
    if (!store) {
      throw new Error("Store not found");
    }
    return store;
  } catch (error) {
    throw new Error("Error updating store: " + error.message);
  }
};

// Delete a store
export const deleteStoreService = async (id) => {
  try {
    const store = await Store.findByIdAndDelete(id);
    if (!store) {
      throw new Error("Store not found");
    }
    return store;
  } catch (error) {
    throw new Error("Error deleting store: " + error.message);
  }
};

export const patchUserService = async (_id, userData) => {
  try {
    const patchedUser = await User.findByIdAndUpdate(
      _id,
      { $set: userData },
      { new: true }
    );
    if (!patchedUser) {
      throw new Error("User not found");
    }
    return patchedUser;
  } catch (error) {
    throw new Error("Error patching user: " + error.message);
  }
};