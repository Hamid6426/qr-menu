import Owner from "../../models/Owner.js";

export const getAllOwnersController = async (req, res) => {
    try {
      try {
        const owners = await Owner.find();
        return owners;
      } catch (error) {
        throw new Error("Error fetching owners: " + error.message);
      }
      res.status(200).json(owners);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };