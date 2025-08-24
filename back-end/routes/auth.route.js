import express, { Router } from "express"
import { forgotPassword, login, logout, resetPassword, signup, verifyEmail, checkAuth, generateMfaSetup, verifyMfaSetup, verifyMfa } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";


import passport from "passport";
import { googleCallback } from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/verify-email", verifyEmail)

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/check-auth", verifyToken, checkAuth);

router.get("/mfa/setup", verifyToken, generateMfaSetup);
router.post("/mfa/verify", verifyMfa);
router.post("/mfa/setup/verify", verifyToken, verifyMfaSetup);





router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));


router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  googleCallback
);





export default router;