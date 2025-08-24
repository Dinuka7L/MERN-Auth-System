// routes/user.routes.js
import express from "express";
import { User } from "../models/user.model.js";
import { verifyToken } from "../middleware/verifyToken.js"; // your auth middleware

const router = express.Router();

// Update profile picture URL
router.put("/profile-picture", verifyToken, async (req, res) => {
  try {
    console.log("📥 Incoming request to /api/user/profile-picture");
    console.log("📥 Body:", req.body);
    console.log("📥 User from verifyToken:", req.user);

    const { url } = req.body;
    if (!url) {
      console.log("❌ No URL provided");
      return res.status(400).json({ message: "URL is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { profilePictureUrl: url },
      { new: true }
    );

    if (!updatedUser) {
      console.log("❌ User not found in DB:", req.user._id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ Updated user profile picture:", updatedUser.profilePictureUrl);
    res.json({ user: updatedUser });
  } catch (err) {
    console.error("🔥 Error in profile-picture route:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
