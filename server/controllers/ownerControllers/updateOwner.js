import Owner from "../../models/Owner.js";

export const updateOwner = async (req, res) => {
  try {
    const ownerId = req.owner.id;
    const { fullName, email } = req.body;

    // Check if email is already in use by another owner
    if (email) {
      const emailExists = await Owner.findOne({ email, _id: { $ne: ownerId } });
      if (emailExists) return res.status(400).json({ message: "Email already in use" });
    }

    const updatedOwner = await Owner.findByIdAndUpdate(
      ownerId,
      { fullName, email },
      { new: true, runValidators: true }
    ).select("-password -verificationCode");

    if (!updatedOwner) return res.status(404).json({ message: "Owner not found" });

    res.json({ message: "Profile updated successfully", owner: updatedOwner });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
