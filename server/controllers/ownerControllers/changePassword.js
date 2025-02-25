import Owner from "../../models/Owner.js";
import bcrypt from "bcrypt";

export const changePassword = async (req, res) => {
    try {
      const ownerId = req.owner.id;
      const { currentPassword, newPassword } = req.body;
  
      const owner = await Owner.findById(ownerId);
      if (!owner) return res.status(404).json({ message: "Owner not found" });
  
      // Check if current password is correct
      const isMatch = await bcrypt.compare(currentPassword, owner.password);
      if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });
  
      // Hash new password and update
      owner.password = await bcrypt.hash(newPassword, 10);
      await owner.save();
  
      res.json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  