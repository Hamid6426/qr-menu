import Owner from "../../models/Owner.js";
import bcrypt from "bcrypt";

export const verifyEmail = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    // Find owner by email
    const owner = await Owner.findOne({ email });
    if (!owner) return res.status(404).json({ message: "Owner not found." });

    // Check if verification code has expired
    if (owner.verificationExpires < new Date()) {
      owner.verificationCode = null;
      owner.verificationExpires = null;
      await owner.save();
      return res.status(400).json({ message: "Verification code expired." });
    }

    // Compare verification codes
    const isMatch = await bcrypt.compare(verificationCode, owner.verificationCode);
    if (!isMatch) return res.status(400).json({ message: "Invalid verification code." });

    // Mark owner as verified and clear verification code
    owner.isVerified = true;
    owner.verificationCode = null;
    owner.verificationExpires = null;
    await owner.save();

    // Send success response
    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Server error" });
  }
};
