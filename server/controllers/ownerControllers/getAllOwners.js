import Owner from "../../models/Owner.js";

export const getAllOwners = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default pagination values

    const owners = await Owner.find()
      .select("-password") // Exclude password for security
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalOwners = await Owner.countDocuments();

    res.json({
      owners,
      totalPages: Math.ceil(totalOwners / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error("Error fetching owners:", error);
    res.status(500).json({ message: "Server error" });
  }
};
