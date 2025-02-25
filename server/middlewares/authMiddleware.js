import jwt from "jsonwebtoken";
import Owner from "../models/Owner.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Get token from cookies

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.owner = await Owner.findById(decoded.id).select("-password");

    if (!req.owner) {
      return res.status(401).json({ message: "Unauthorized: Owner not found" });
    }

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
