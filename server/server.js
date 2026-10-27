import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import questionRoutes from "./routes/question.js";
import authMiddleware from "./middleware/auth.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);

// Protected test
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected data accessed 🔐",
    user: req.user
  });
});

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(console.log);

// Test
app.get("/", (req, res) => {
  res.send("API Running Successfully 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});