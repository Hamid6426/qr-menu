import Owner from "../../models/Owner.js";

export const patchOwnerController = async (req, res) => {
    try {
      const owner = await patchOwnerService(req.params._id, req.body);
      try {
        const patchedOwner = await Owner.findByIdAndUpdate(
          ownerId,
          { $set: ownerData },
          { new: true }
        );
        if (!patchedOwner) {
          throw new Error("Owner not found");
        }
        return patchedOwner;
      } catch (error) {
        throw new Error("Error patching owner: " + error.message);
      }
      res.status(200).json(owner);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };