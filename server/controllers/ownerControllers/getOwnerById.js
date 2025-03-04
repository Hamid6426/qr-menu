export const getOwnerById = async (req, res) => {
  try {
    const owner = req.owner; // Already authenticated via authMiddleware

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.status(200).json({ message: "Fetching successful", owner: owner });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
