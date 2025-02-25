import Owner from "../../models/Owner.js";

export const updateOwnerController = async (req, res) => {
  try {
    const owner = await updateOwnerService(req.params._id, req.body);
    try {
      const updatedOwner = await Owner.findByIdAndUpdate(ownerId, ownerData, {
        new: true,
      });
      if (!updatedOwner) {
        throw new Error("Owner not found");
      }
      return updatedOwner;
    } catch (error) {
      throw new Error("Error updating owner: " + error.message);
    }
    res.status(200).json(owner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};