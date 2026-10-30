
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import questionRoutes from "./routes/question.js";
import authMiddleware from "./middleware/auth.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);

// Protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected data accessed",
    user: req.user
  });
});

// Test route
app.get("/", (req, res) => {
  res.send("ExamPrep API Running Successfully!");
});

// Port
const PORT = process.env.PORT || 5000;

// Database & Server
const startServer = async () => {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB Connected Successfully");
    } else {
      console.log("MONGO_URI not configured yet");
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Database Connection Error:", error.message);
    process.exit(1);
  }
};

startServer();
