import {
  verifyEmailService,
  resendCodeService,
  registerOwnerService,
  changeOwnerPasswordService,
  forgotPasswordService,
  getAllOwnersService,
  getOwnerByIdService,
  updateOwnerService,
  patchOwnerService,
  deleteOwnerService,
  searchOwnersService,
} from "../services/ownerService.js";
import Owner from "../models/Owner.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";

export const verifyEmailController = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    await verifyEmailService(email, verificationCode);

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(400).json({ message: error.message });
  }
};

export const resendCodeController = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await resendCodeService(email);
    res.json(response);
  } catch (error) {
    console.error("Error resending verification code:", error);
    res.status(400).json({ message: error.message });
  }
};

export const registerOwnerController = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    await registerOwnerService({ email, password, fullName });

    res
      .status(201)
      .json({ message: "Owner registered. Please verify your email." });
  } catch (error) {
    if (error.message === "Email already in use") {
      return res.status(400).json({ message: error.message });
    }
    console.error("Error registering owner:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt with email:", email);

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

    if (!owner.isVerified) {
      console.log("Email not verified");
      return res.status(400).json({ message: "Email not verified" });
    }

    // Generate token
    const token = generateToken(owner);

    console.log("Login successful");
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const forgotPasswordController = async (req, res) => {
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
      "Owner logged out successfully. Please clear your token on the client-side.",
  });
};

export const getAllOwnersController = async (req, res) => {
  try {
    const owners = await getAllOwnersService();
    res.status(200).json(owners);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getOwnerByIdController = async (req, res) => {
  try {
    const owner = await getOwnerByIdService(req.params._id);
    res.status(200).json(owner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateOwnerController = async (req, res) => {
  try {
    const owner = await updateOwnerService(req.params._id, req.body);
    res.status(200).json(owner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const patchOwnerController = async (req, res) => {
  try {
    const owner = await patchOwnerService(req.params._id, req.body);
    res.status(200).json(owner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteOwnerController = async (req, res) => {
  try {
    const owner = await deleteOwnerService(req.params._id);
    res.status(200).json(owner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const changePasswordController = async (req, res) => {
  try {
    const owner = await changeOwnerPasswordService(
      req.params._id,
      req.body.newPassword
    );
    res.status(200).json(owner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const profileController = async (req, res) => {
  try {
    const owner = await getOwnerByIdService(req.owner._id); // Assuming req.owner contains authenticated owner's _id
    res.status(200).json(owner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const searchOwnersController = async (req, res) => {
  try {
    const owners = await searchOwnersService(req.query);
    res.status(200).json(owners);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const logoutController = async (req, res) => {
  try {
    console.log("Owner Logged Out")
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};