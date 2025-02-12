const jwt = require("jsonwebtoken");
const User = require("../models/Owner");
require("dotenv").config();
const SALT_ROUNDS = +process.env.SALT_ROUNDS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Check for Token
exports.authToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

//Routes for Waiters
exports.waitersAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role === "waiter") {
      return res.status(401).send("Access denied. You are not a waiter user.");
    }
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

//Routes for cousine
exports.cousineAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role === "cuisine") {
      return res.status(401).send("Access denied. You are not a cuisine user");
    }
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

// Routes for Manager
exports.managerAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== "manager") {
      return res.status(403).send("Access denied. Manager only.");
    }
    next();
  } catch (error) {
    res.status(500).send("Server error.");
  }
};

// Routes for Admin
exports.adminAuth = async (req, res, next) => {
  const user = await User.findById(req.user.userId);
  console.log(user)
  try {
    if (!user || user.role !== "admin")
      return res.status(403).send("Access denied. You are not Admin");
    next();
  } catch (error) {
    console.error("Error verification token", error);
  }
};
