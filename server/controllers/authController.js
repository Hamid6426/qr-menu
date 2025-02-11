import {
  forgotPasswordService,
} from "../services/userService.js";
import User from "../models/User.js";
import { sendVerificationEmail } from "../services/emailService.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Check for existing user
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user with verification code and expiry
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationCodeExpiresAt = new Date(Date.now() + 3600000); // 1 hour expiration

    user = new User({
      email,
      password,
      fullName,
      verificationCode,
      verificationCodeExpiresAt,
      isVerified: false
    });

    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, verificationCode);

    res.status(201).json({ message: "User registered. Please verify your email." });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.verificationCode !== verificationCode) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    if (user.verificationCodeExpiresAt < new Date()) {
      return res.status(400).json({ message: "Verification code expired" });
    }

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpiresAt = null;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resendCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationCodeExpiresAt = new Date(Date.now() + 3600000); // 1 hour expiration

    user.verificationCode = verificationCode;
    user.verificationCodeExpiresAt = verificationCodeExpiresAt;
    await user.save();

    // Resend verification email
    await sendVerificationEmail(user.email, verificationCode);

    res.json({ message: "Verification code resent successfully" });
  } catch (error) {
    console.error("Error resending verification code:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt with email:", email);

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      console.log("Email not verified");
      return res.status(400).json({ message: "Email not verified" });
    }

    // Generate token
    const token = generateToken(user);

    console.log("Login successful");
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const result = await forgotPasswordService(req.body.email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  res.status(200).json({
    message:
      "User logged out successfully. Please clear your token on the client-side.",
  });
};
