import Owner from "../../models/Owner.js";

export const deleteOwner = async (req, res) => {
  try {
    const ownerId = req.owner.id; // Extract owner ID from token

    // Find and delete the owner
    const owner = await Owner.findByIdAndDelete(ownerId);
    if (!owner) return res.status(404).json({ message: "Owner not found" });

    // Clear the authentication cookie
    res.clearCookie("token");

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Server error" });
  }
};
