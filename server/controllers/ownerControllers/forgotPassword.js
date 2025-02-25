import bcrypt from "bcrypt";
import crypto from "crypto";
import Owner from "../../models/Owner.js";
import { sendResetPasswordEmail } from "../../services/emailService.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user
    const owner = await Owner.findOne({ email });
    if (!owner) return res.status(400).json({ message: "Owner not found" });

    // Generate a secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = await bcrypt.hash(resetToken, 10); // 🔹 Hashing token manually
    const resetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

    // Store hashed token & expiry
    owner.verificationCode = resetTokenHash;  
    owner.verificationExpires = resetExpires;
    await owner.save();

    // Send reset token (plain, not hashed) via email
    await sendResetPasswordEmail(email, resetToken);

    res.json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Server error" });
  }
};
