import Owner from "../../models/Owner.js";

export const getOwnerById = async (req, res) => {
    try {
      const ownerId = req.owner.id; // Assuming `req.owner` is set in authentication middleware
      const owner = await Owner.findById(ownerId).select("-password -verificationCode");
  
      if (!owner) return res.status(404).json({ message: "Owner not found" });
  
      res.json(owner);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  