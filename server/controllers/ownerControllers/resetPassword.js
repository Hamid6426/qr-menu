import bcrypt from "bcrypt";
import Owner from "../../models/Owner.js";

export const resetPassword = async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body;

    // Find the user by email
    const owner = await Owner.findOne({ email });
    if (!owner) return res.status(400).json({ message: "Owner not found" });

    // Check if the reset token is valid and not expired
    if (!owner.verificationCode || !owner.verificationExpires || owner.verificationExpires < new Date()) {
      return res.status(400).json({ message: "Reset token is invalid or expired" });
    }

    // Compare the provided token with the stored hashed token
    const isMatch = await bcrypt.compare(resetToken, owner.verificationCode);
    if (!isMatch) return res.status(400).json({ message: "Invalid reset token" });

    // Hash the new password
    owner.password = await bcrypt.hash(newPassword, 10); // 🔹 Hashing password manually

    // Clear reset token fields
    owner.verificationCode = null;
    owner.verificationExpires = null;

    // Save the updated owner data
    await owner.save();

    res.json({ message: "Password reset successful. You can now log in." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Server error" });
  }
};
