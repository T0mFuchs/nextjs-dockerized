import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "email already exists"],
  },
  image: {
    type: String,
  },
  emailVerified: {
    type: Boolean || null,
  },
});

export default mongoose.models.user || mongoose.model("user", userSchema);
