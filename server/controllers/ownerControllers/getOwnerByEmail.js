import Owner from "../../models/Owner.js";

export const getOwnerByEmail = async (email) => {
    try {
      const owner = await Owner.findOne({ email });
      if (!owner) {
        throw new Error("Owner not found");
      }
      return owner;
    } catch (error) {
      throw new Error("Error fetching owner: " + error.message);
    }
  };