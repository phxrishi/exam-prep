import express from "express";
import Question from "../models/Question.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// 📥 Get all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➕ Add question (Admin only)
router.post("/add", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin allowed ❌" });
    }

    const { question, options, answer } = req.body;

    const newQ = new Question({ question, options, answer });
    await newQ.save();

    res.json({ message: "Question added ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Delete question (Admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin allowed ❌" });
    }

    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: "Question deleted ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;