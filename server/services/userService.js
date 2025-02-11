import User from "../models/User.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendVerificationEmail } from "./emailService.js";

// Generate and store verification code
export const sendVerificationCodeService = async (email) => {
  try {
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10-minute expiry

    await User.findOneAndUpdate(
      { email }, 
      { verificationCode: code, verificationCodeExpiresAt: expiresAt },
      { new: true, upsert: false }
    );

    return code;
  } catch (error) {
    throw new Error("Error storing verification code: " + error.message);
  }
};

// Verify the Code
export const verifyCodeService = async (email, code) => {
  try {
    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found.");
    if (!user.verificationCode || user.verificationCodeExpiresAt < new Date()) {
      throw new Error("Verification code expired or not found.");
    }
    if (user.verificationCode !== code)
      throw new Error("Invalid verification code.");

    // Mark user as verified and remove the code
    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpiresAt = null;
    await user.save();

    return true;
  } catch (error) {
    throw new Error("Error verifying code: " + error.message);
  }
};

// Create User
export const registerUserService = async ({ email, password, fullName }) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already in use");

  // Generate a verification code
  const verificationCode = crypto.randomInt(100000, 999999).toString();
  const verificationCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

  // Create user
  const newUser = new User({
    email,
    password,
    fullName,
    verificationCode,
    verificationCodeExpiresAt,
    isVerified: false,
  });

  await newUser.save();
  await sendVerificationEmail(email, verificationCode);
  return { userId: newUser._id };
};

export const getAllUsersService = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

export const getUserByIdService = async (_id) => {
  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

export const getUserByEmailService = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

export const updateUserService = async (_id, userData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, userData, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
};

export const patchUserService = async (_id, userData) => {
  try {
    const patchedUser = await User.findByIdAndUpdate(
      _id,
      { $set: userData },
      { new: true }
    );
    if (!patchedUser) {
      throw new Error("User not found");
    }
    return patchedUser;
  } catch (error) {
    throw new Error("Error patching user: " + error.message);
  }
};

export const deleteUserService = async (_id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(_id);
    if (!deletedUser) {
      throw new Error("User not found");
    }
    return deletedUser;
  } catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
};

// Change user password
export const changeUserPasswordService = async (_id, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { password: hashedPassword },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  } catch (error) {
    throw new Error("Error changing password: " + error.message);
  }
};

// Authenticate user, used for login
export const authenticateUserService = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }
    return user;
  } catch (error) {
    throw new Error("Error authenticating user: " + error.message);
  }
};

export const forgotPasswordService = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    // Logic to send password reset email goes here
    return { message: "Password reset email sent" };
  } catch (error) {
    throw new Error("Error handling forgot password: " + error.message);
  }
};

// Search users
export const searchUsersService = async (criteria) => {
  try {
    const users = await User.find(criteria);
    return users;
  } catch (error) {
    throw new Error("Error searching users: " + error.message);
  }
};
