import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Owner from "../../models/Owner.js";

export const loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt with email:", email);

    // Find owner by email
    const owner = await Owner.findOne({ email });
    if (!owner) {
      console.log("Owner not found");
      return res.status(400).json({ message: "Owner not found" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      console.log("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if email is verified
    if (!owner.isVerified) {
      console.log("Email not verified");
      return res.status(400).json({ message: "Email not verified" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: owner._id,
        ownerId: owner.ownerId,
        email: owner.email,
        fullName: owner.fullName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,  // Prevents JavaScript access (more secure)
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "Strict", // CSRF protection
      maxAge: 12 * 60 * 60 * 1000, // 12 hours expiry
    });

    console.log("Login successful");
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};
