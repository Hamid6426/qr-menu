import Owner from "../../models/Owner.js";

export const updateOwner = async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const ownerId = req.owner._id; // ✅ Getting owner from authMiddleware

    // Find and update owner
    const updatedOwner = await Owner.findByIdAndUpdate(
      ownerId,
      { fullName, email },
      { new: true, runValidators: true }
    );

    if (!updatedOwner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.json({ message: "Profile updated successfully", owner: updatedOwner });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};