const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Store = require("../models/Store");
const SALT_ROUNDS = +process.env.SALT_ROUNDS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const multer = require("multer");
const sharp = require("sharp");
const nodemailer = require("nodemailer");

const gmailUser = process.env.EMAIL_USER;
const gmailPassword = process.env.EMAIL_PASSWORD;

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Set up the nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, //587 or 465 for SSL
  secure: true, // true for SSL (port 465), false for STARTTLS (port 587)
  auth: {
    user: gmailUser,
    pass: gmailPassword,
  },
  // if not work,
  tls: {
    rejectUnauthorized: false,
  },
});

// Function to send verification emails
const sendVerificationEmail = async (email, verificationCode) => {
  const mailOptions = {
    from: gmailUser,
    to: email,
    subject: "Verify Your Email",
    html: `<p>Your verification code is: <b>${verificationCode}</b>. Please enter this code to complete your signup.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to", email);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

// Function to send password reset emails
const sendPasswordResetEmail = async (email, resetToken) => {
  const mailOptions = {
    from: gmailUser,
    to: email,
    subject: "Reset Your Password",
    text: `To reset your password, please enter the following code on our website: ${resetToken}. This code is valid for 15 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent to", email);
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};

// Send verification code function
exports.sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    const verificationCode = Math.floor(1000 + Math.random() * 9000);
    if (user) {
      user.verificationCode = verificationCode;
      await user.save();
    }
    await sendVerificationEmail(email, verificationCode);
    return res.json({ message: "Verification code sent to your email." });
  } catch (error) {
    console.error("Error sending verification code:", error);
  }
};
  
//Register New user
exports.register = [
  upload.single("thumbnail"), // Middleware to handle the file
  async (req, res) => {
    try {
      const { storeName, owner } = req.body;
      const { email, password, resetCode, role, storeId } = req.body;
      const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
      let thumbnail = null;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      // Check if the verification code exist
      if (user.resetCode !== resetCode) {
        return res.status(400).json({ message: "Invalid verification code" });
      }

      const store = await Store.findOne({ storeName });
      if (store)
        return res
          .status(400)
          .json({ message: "Store already exists choose different name" });

      if (req.file) {
        thumbnail = await sharp(req.file.buffer)
          .resize({ width: 300, height: 300 }) // Resize image
          .toFormat("jpeg")
          .jpeg({ quality: 80 }) // Compress image
          .toBuffer();
      }
      const newUser = new User({ email, password: hashedPassword, role });
      await newUser.save();

      const newStore = new Store({ storeName, thumbnail, owner: newUser._id });
      await newStore.save();
      newUser.storeId = newStore._id;
      await newUser.save();
      const token = jwt.sign(
        {
          userId: newUser._id,
          role: newUser.role,
          storeId: newStore._id,
          storeName: newStore.storeName,
        },
        PRIVATE_KEY,
        {
          expiresIn: "1h",
        }
      );
      res
        .status(201)
        .json({ token, message: "User and Store created successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error in Registering and Creating the store" });
    }
  },
];

// Register as an admin
exports.adminRegister = async (req, res) => {
  const { email, password, resetCode, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.resetCode !== resetCode)
      return res.status(400).json({ message: "Invalid reset code" });
    const newUser = new User({
      email,
      password: hashedPassword,
      role: "admin",
    });
    await newUser.save();
    user.emailVerified = true;
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      PRIVATE_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ token, message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in Registering the admin" });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).populate("storeId");
    if (!user) return res.status(400).json({ message: "Email not found" });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        storeId: user.storeId ? user.storeId._id : null,
        storeName: user.storeId ? user.storeId.storeName : null, // Access storeName from populated storeId
      },
      PRIVATE_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in user",
      error,
    });
  }
};

// Update User profile -- MANAGER
exports.updateManagerProfile = async (req, res) => {
  const { email, password, storeName } = req.body;
  const userId = req.params.userId;

  try {
    const updates = {};
    if (email) updates.email = email;
    if (password) updates.password = bcrypt.hashSync(password, SALT_ROUNDS);

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    // Update store name if provided
    if (storeName && user.storeId) {
      const store = await Store.findById(user.storeId);
      if (store) {
        store.storeName = storeName;
        await store.save();
      }
    }

    // Update user details
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    res.status(200).json({
      message: "Manager profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating manager profile",
      error,
    });
  }
};

// Update profile WAITER AND COUSINE
exports.updateUserProfile = async (req, res) => {
  const { email, password } = req.body;
  const userId = req.params.userId;

  try {
    const updates = {};
    if (email) updates.email = email;
    if (password) updates.password = bcrypt.hashSync(password, SALT_ROUNDS);

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    if (!updatedUser)
      return res.status(400).json({ message: "User not found" });

    res.status(200).json({
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user profile",
      error,
    });
  }
};

//Forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    user.resetCode = Math.floor(1000 + Math.random() * 9000);
    user.resetTokenExpiration = Date.now() + 15 * 60 * 1000;
    await user.save();
    await sendPasswordResetEmail(user.email, user.resetCode);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
};

//Reset Password
exports.resetPassword = async (req, res) => {
  const { resetCode, newPassword } = req.body;
  try {
    const user = await User.findOne({ resetCode });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.resetTokenExpiration < Date.now()) {
      return res.status(400).json({ message: "Reset token expired" });
    }
    user.password = bcrypt.hashSync(newPassword, SALT_ROUNDS);
    user.resetCode = null;
    user.resetTokenExpiration = null;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
};

// Delete Manager profile, store and all the users of the store
exports.deleteProfile = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user to check their role
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not Found" });

    if (user.role === "manager") {
      // Find the store owned by the manager
      const store = await Store.findByIdAndDelete(user.storeId);
      if (store) {
        // Delete all users associated with the store
        await User.deleteMany({ storeId: store._id });
      }
    }

    // Delete the manager
    await User.findByIdAndDelete(userId);

    res
      .status(200)
      .json({ message: "Profile and associated data deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user profile",
      error,
    });
  }
};

// Create User --Manager ONLY
exports.createUser = async (req, res) => {
  const { email, password, role } = req.body;

  // Ensure no 'admin' role is assigned
  if (role === "admin") {
    return res
      .status(403)
      .json({ message: "Unauthorized to assign 'admin' role" });
  }

  try {
    // Get the storeId from the logged-in user (attached to req.user in middleware)
    const loggedInUser = await User.findById(req.user.userId);
    if (!loggedInUser || !loggedInUser.storeId) {
      return res.status(403).json({
        message: "Store association not found for the logged-in user",
      });
    }

    // Check if the email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    // Create a new user with the storeId of the logged-in user
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      storeId: loggedInUser.storeId, // Assign the same storeId
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error,
    });
  }
};

// Change user role --Manager ONLY
exports.changeUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  const validRole = ["waiter", "cousine", "manager"];
  if (!validRole.includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { role } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User role updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user role", error });
  }
};

// Get store users --Manager ONLY
exports.getStoreUsers = async (req, res) => {
  try {
    const managerUser = await User.findById(req.user.userId);
    console.log(managerUser);
    if (!managerUser  || !managerUser .storeId) {
      return res.status(400).json({ message: "Manager not associated with any store" });
    }
    const users = await User.find({ storeId: managerUser.storeId });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users for admin:", error);
    res.status(500).send("Server error.");
  }
};

// Get all User -- Admin only
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users for superUser:", error);
    res.status(500).send("Server error.");
  }
};
