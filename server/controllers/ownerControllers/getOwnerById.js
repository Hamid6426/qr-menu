export const getOwnerById = async (req, res) => {
    try {
        const owner = req.owner; // Already authenticated via authMiddleware
        res.json({ message: "Fetching successful", owner: owner });
      } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error" });
      }
  };
  