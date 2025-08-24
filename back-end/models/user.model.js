// models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      validate: {
        validator: function (v) {
          if (!this.isGoogleUser && (!v || v.length === 0)) return false;
          return true;
        },
        message: "Password is required for normal signups",
      },
    },
    name: { type: String, required: true },
    isGoogleUser: { type: Boolean, default: false },
    lastLogin: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    isMfaEnabled: { type: Boolean, default: false },
    mfaSecret: { type: String, default: null },
    mfaTempSecret: { type: String, default: null },
    mfaTempToken: { type: String },
    mfaTempTokenExpires: { type: Date },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,

    // ✅ New field for profile picture URL
    profilePictureUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
