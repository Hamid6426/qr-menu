import bcrypt from "bcrypt";
import Owner from "../../models/Owner.js";
import { sendVerificationEmail } from "../../services/emailService.js";

export const registerOwner = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    const existingOwner = await Owner.findOne({ email });
    if (existingOwner) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const newOwner = new Owner({
      email,
      password: hashedPassword,
      fullName,
      verificationCode,
      verificationExpires: expiresAt,
      isVerified: false,
    });

    // Send verification email before saving
    await sendVerificationEmail(email, verificationCode);
    await newOwner.save();

    return res.status(201).json({
      message: "Owner registered. Please verify your email.",
    });
  } catch (error) {
    console.error("Error registering owner:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
