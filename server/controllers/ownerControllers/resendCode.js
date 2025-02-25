import Owner from "../../models/Owner.js";
import { sendVerificationEmail } from "../../services/emailService.js";

export const resendCode = async (req, res) => { 
  try {
    const { email } = req.body;

    // Find the owner
    const owner = await Owner.findOne({ email });
    if (!owner) return res.status(404).json({ message: "Owner not found." });

    // Generate a new verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes

    // Send verification email first
    await sendVerificationEmail(email, verificationCode);

    // Update the owner's verification details
    owner.verificationCode = verificationCode;
    owner.verificationExpires = expiresAt;
    await owner.save();

    // Send success response
    res.json({ message: "Verification code resent successfully." });
  } catch (error) {
    console.error("Error resending verification code:", error);
    res.status(500).json({ message: "Server error" });
  }
};
