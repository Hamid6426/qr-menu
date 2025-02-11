import sharp from "sharp";
import Store from "../models/Store.js";

export const createStoreService = async (storeData, file) => {
  const storeCount = await Store.countDocuments({ adminId: storeData.adminId });
  if (storeCount >= 3) {
    throw new Error("Limit reached: An admin can only create up to 3 stores.");
  }

  let storeThumbnail = null;
  if (file) {
    storeThumbnail = await sharp(file.buffer)
      .resize(300, 300) // Resize to 300x300 pixels
      .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
      .toBuffer();
  }

  const store = new Store({
    storeThumbnail: storeThumbnail,
    storeName: storeData.storeName,
    description: storeData.description,
    address: storeData.address,
    storePhone: storeData.storePhone,
    storeEmail: storeData.storeEmail,
    storeWebsite: storeData.storeWebsite,
    adminId: storeData.adminId,
  });

  await store.save();
  return store;
};

export const getAllStoresService = async () => {
  return await Store.find().lean();
};


export const getStoreByIdService = async (_id) => {
  const store = await Store.findById(_id);
  if (!store) {
    throw new Error("Store not found");
  }
  return store;
};

export const updateStoreService = async (_id, storeData, file) => {
  const store = await Store.findById(_id);
  if (!store) {
    throw new Error("Store not found");
  }

  let storeThumbnail = store.storeThumbnail;
  if (file) {
    storeThumbnail = await sharp(file.buffer)
      .resize(300, 300)
      .jpeg({ quality: 80 })
      .toBuffer();
  }

  store.storeName = storeData.storeName || store.storeName;
  store.description = storeData.description || store.description;
  store.address = storeData.address || store.address;
  store.storePhone = storeData.storePhone || store.storePhone;
  store.storeEmail = storeData.storeEmail || store.storeEmail;
  store.storeWebsite = storeData.storeWebsite || store.storeWebsite;
  store.storeThumbnail = storeThumbnail;

  await store.save();
  return store;
};

export const deleteStoreService = async (_id) => {
  console.log("Deleting store with ID:", _id); // Debugging log

  const store = await Store.findByIdAndDelete(_id);
  if (!store) {
    console.log("Store not found in database.");
    throw new Error("Store not found or already deleted");
  }

  console.log("Store deleted successfully:", store);
  return store;
};