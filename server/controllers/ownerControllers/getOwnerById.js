import Owner from "../../models/Owner.js";

export const getOwnerByIdController = async (req, res) => {
    try {
      const owner = await getOwnerByIdService(req.params._id);
      try {
        const owner = await Owner.findById(ownerId);
        if (!owner) {
          throw new Error("Owner not found");
        }
        return owner;
      } catch (error) {
        throw new Error("Error fetching owner: " + error.message);
      }
      res.status(200).json(owner);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };