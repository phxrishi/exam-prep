import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  // 🔥 ADD THIS
  role: {
    type: String,
    default: "student"
  }
});

export default mongoose.model("User", userSchema);