import jwt from "jsonwebtoken";
import Owner from "../models/Owner.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ error: "No token provided. Please authenticate." });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const owner = await Owner.findOne({
      _id: decoded.id // Ensure this matches the `id` field in the JWT payload
    });

    if (!owner) {
      return res.status(401).send({ error: "Invalid token. Please authenticate." });
    }

    req.owner = owner; // Attach the owner to the request object
    next();
  } catch (error) {
    res.status(401).send({ error: "Authentication failed. Invalid or expired token." });
  }
};
