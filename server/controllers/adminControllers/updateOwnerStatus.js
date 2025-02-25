export const updateOwnerStatus = async (req, res) => {
  try {
    const { ownerId, isVerified } = req.body;

    const owner = await Owner.findById(ownerId);
    if (!owner) return res.status(404).json({ message: "Owner not found" });

    owner.isVerified = isVerified; // Update verification status
    await owner.save();

    res.json({ message: "Owner status updated successfully" });
  } catch (error) {
    console.error("Error updating owner status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
