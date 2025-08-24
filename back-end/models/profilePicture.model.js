import mongoose from "mongoose";

const ProfilePictureSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export const ProfilePicture = mongoose.model("ProfilePicture", ProfilePictureSchema);
