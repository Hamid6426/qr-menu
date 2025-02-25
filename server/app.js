import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/db.js";
import { ownerRouter } from "./routes/ownerRoutes.js";
import { storeRouter } from "./routes/storeRoutes.js";
import { workerRouter } from "./routes/workerRoutes.js";
import { menuRouter } from "./routes/menuRoutes.js";
import { orderRouter } from "./routes/orderRoutes.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
db();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true, // Allows all origins
    credentials: true,
  })
);

// Define Test API Routes
app.get("/", (_req, res) => {
  res.json({ message: "Hello, This is qr-menu Backend!" });
});
app.get("/api", (_req, res) => {
  res.json({ message: "Hello, This is qr-menu API!" });
});

// Routes
app.use("/api/owners", ownerRouter); // Owner routes

export default app;