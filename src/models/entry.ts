import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    unique: [true, "title already exists"],
  },
  body: {
    type: String,
    required: [true, "body is required"],
  },
  visibility: {
    type: Boolean,
    required: [true, "set true or false"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "author is required"],
  },
  updatedAt: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true],
    unique: [true],
  },
});

export default mongoose.models.entry || mongoose.model("entry", entrySchema);
