import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../../models/Admin.js";
import { sendAdminApprovalEmail } from "../../services/emailService.js";

export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a verification token
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "12h", // 12 hour expiry for security
    });

    // Create a new admin entry but mark as 'pending'
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
      isVerified: false, // Will be set to true once approved
      verificationToken,
    });

    await newAdmin.save();

    // Send an approval request email to the main admin
    await sendAdminApprovalEmail("mianhamid6426@gmail.com", email, verificationToken);

    res.status(201).json({
      message: "Admin registration request sent. Waiting for approval.",
    });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};
