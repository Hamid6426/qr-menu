import Owner from "../models/Owner.js";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "./emailService.js";

export const registerOwnerService = async ({ email, password, fullName }) => {
  if (await Owner.findOne({ email })) throw new Error("Email already in use");

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  const newOwner = new Owner({
    email, password, fullName,
    verificationCode: verificationCode,
    verificationCodeExpiresAt: expiresAt,
    isVerified: false,
  });

  await newOwner.save();
  await sendVerificationEmail(email, verificationCode);

  return { ownerId: newOwner._id };
};

export const verifyEmailService = async (email, code) => {
  const owner = await Owner.findOne({ email });
  if (!owner) throw new Error("Owner not found.");
  if (owner.verificationCodeExpiresAt < new Date()) {
    await Owner.updateOne({ email }, { verificationCode: null, verificationCodeExpiresAt: null });
    throw new Error("Verification code expired.");
  }
  
  const isMatch = await bcrypt.compare(code, owner.verificationCode);
  if (!isMatch) throw new Error("Invalid verification code.");

  await Owner.updateOne(
    { email },
    { isVerified: true, verificationCode: null, verificationCodeExpiresAt: null }
  );

  return { message: "Email verified successfully" };
};  

export const resendCodeService = async (email) => {
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  const owner = await Owner.findOneAndUpdate(
    { email },
    { verificationCode: verificationCode, verificationCodeExpiresAt: expiresAt }
  );
  if (!owner) throw new Error("Owner not found.");

  await sendVerificationEmail(email, verificationCode);
  return { message: "Verification code resent successfully" };
};

export const getAllOwnersService = async () => {
  try {
    const owners = await Owner.find();
    return owners;
  } catch (error) {
    throw new Error("Error fetching owners: " + error.message);
  }
};

export const getOwnerByIdService = async (ownerId) => {
  try {
    const owner = await Owner.findById(ownerId);
    if (!owner) {
      throw new Error("Owner not found");
    }
    return owner;
  } catch (error) {
    throw new Error("Error fetching owner: " + error.message);
  }
};

export const getOwnerByEmailService = async (email) => {
  try {
    const owner = await Owner.findOne({ email });
    if (!owner) {
      throw new Error("Owner not found");
    }
    return owner;
  } catch (error) {
    throw new Error("Error fetching owner: " + error.message);
  }
};

export const updateOwnerService = async (ownerId, ownerData) => {
  try {
    const updatedOwner = await Owner.findByIdAndUpdate(ownerId, ownerData, {
      new: true,
    });
    if (!updatedOwner) {
      throw new Error("Owner not found");
    }
    return updatedOwner;
  } catch (error) {
    throw new Error("Error updating owner: " + error.message);
  }
};

export const patchOwnerService = async (ownerId, ownerData) => {
  try {
    const patchedOwner = await Owner.findByIdAndUpdate(
      ownerId,
      { $set: ownerData },
      { new: true }
    );
    if (!patchedOwner) {
      throw new Error("Owner not found");
    }
    return patchedOwner;
  } catch (error) {
    throw new Error("Error patching owner: " + error.message);
  }
};

export const deleteOwnerService = async (ownerId) => {
  try {
    const deletedOwner = await Owner.findByIdAndDelete(ownerId);
    if (!deletedOwner) {
      throw new Error("Owner not found");
    }
    return deletedOwner;
  } catch (error) {
    throw new Error("Error deleting owner: " + error.message);
  }
};

// Change owner password
export const changeOwnerPasswordService = async (ownerId, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedOwner = await Owner.findByIdAndUpdate(
      ownerId,
      { password: hashedPassword },
      { new: true }
    );
    if (!updatedOwner) {
      throw new Error("Owner not found");
    }
    return updatedOwner;
  } catch (error) {
    throw new Error("Error changing password: " + error.message);
  }
};

// Authenticate owner, used for login
export const loginService = async (email, password) => {
  try {
    const owner = await Owner.findOne({ email });
    if (!owner) {
      throw new Error("Owner not found");
    }
    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }
    return owner;
  } catch (error) {
    throw new Error("Error authenticating owner: " + error.message);
  }
};

export const forgotPasswordService = async (email) => {
  try {
    const owner = await Owner.findOne({ email });
    if (!owner) {
      throw new Error("Owner not found");
    }
    // Logic to send password reset email goes here
    return { message: "Password reset email sent" };
  } catch (error) {
    throw new Error("Error handling forgot password: " + error.message);
  }
};

// Search owners
export const searchOwnersService = async (criteria) => {
  try {
    const owners = await Owner.find(criteria);
    return owners;
  } catch (error) {
    throw new Error("Error searching owners: " + error.message);
  }
};
