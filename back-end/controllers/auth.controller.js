    import { User } from "../models/user.model.js";
    import crypto from "crypto";
    import bcryptjs from "bcryptjs";
    import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
    import { sendVerificationEmail, sendWelcomeEmail, sendRestPasswordEmail, sendResetSuccessEmail } from "../mailtrap/emails.js";
    import speakeasy from "speakeasy";
    import QRCode from "qrcode";


    export const signup = async (req, res) => {
        const { email, password, name, isGoogleUser } = req.body; // allow isGoogleUser flag

        try {
            // Check required fields only for normal signup
            if (!email || !name || (!password && !isGoogleUser)) {
                throw new Error("All required fields must be provided");
            }

            const userAlreadyExists = await User.findOne({ email });
            if (userAlreadyExists) {
                return res.status(400).json({ success: false, message: "User already exists" });
            }

            // Hash password only if provided
            let hashedPassword = undefined;
            if (password) {
                hashedPassword = await bcryptjs.hash(password, 10);
            }

            // Generate verification token only for normal signups
            let verificationToken, verificationTokenExpiresAt;
            if (!isGoogleUser) {
                verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
                verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
            }

            const user = new User({
                email,
                password: hashedPassword,
                name,
                isGoogleUser: isGoogleUser || false,
                verificationToken,
                verificationTokenExpiresAt
            });

            await user.save();

            // JWT
            generateTokenAndSetCookie(res, user._id);

            // Send verification email only for normal signup
            if (!isGoogleUser) {
                await sendVerificationEmail(user.name, user.email, verificationToken);
            }

            res.status(201).json({
                success: true,
                message: "User created successfully",
                user: {
                    ...user._doc,
                    password: undefined,
                },
            });

        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    };

    export const verifyEmail = async (req, res) => {
        const { code } = req.body;
        try {
            const user = await User.findOne({
                verificationToken: code,
                verificationTokenExpiresAt: { $gt: Date.now()}
            })

            if (!user) {
                return res.status(400).json({success:false, message:"Invalid or expired code"}) }

            user.isVerified = true;
            user.verificationToken = undefined;
            user.verificationTokenExpiresAt = undefined;
            await user.save();

            await sendWelcomeEmail(user.email, user.name);

            res.status(200).json({
                success: true,
                message: "Email verified successfully",
                user: {
                    ...user._doc,
                    password: undefined,
                },
            });
            } catch (error) {
                console.log("error in verifyEmail ", error);
                res.status(500).json({ success: false, message: "Server error" });
        }


    }


    export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid Credentials" });

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ success: false, message: "Invalid Credentials" });

    console.log("User logging in:", user.email, "MFA enabled:", user.isMfaEnabled);


    // Check if MFA is enabled
    if (user.isMfaEnabled) {
      // DO NOT issue full JWT yet
      // Issue temporary MFA token (can be short-lived JWT or just server-side session)
      const mfaToken = crypto.randomBytes(20).toString("hex");
      user.mfaTempToken = mfaToken;
      user.mfaTempTokenExpires = Date.now() + 5 * 60 * 1000; // 5 min validity
      await user.save();

      return res.status(200).json({
        success: true,
        mfaRequired: true,
        message: "MFA required",
        tempToken: mfaToken, // frontend must send this with MFA code
      });
    }

    // No MFA → issue full JWT
    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "User Logged in successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


    export const logout = async (req,res) => {
        res.clearCookie("token");
        res.status(200).json({ success: true, message: "Logged out successfully" });
    }

    export const forgotPassword =  async (req, res) => {
        const { email } = req.body
        try {
            const user = await User.findOne({email})

            if (!user){
                return res.status(404).json({success:false, message:"Account for the email does not exist"})
            }
            
            generateTokenAndSetCookie(res, user._id);

            const resetToken = crypto.randomBytes(20).toString("hex");
            const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

            user.resetPasswordToken = resetToken;
            user.resetPasswordExpiresAt = resetTokenExpiresAt;

            await user.save();
            


            await sendRestPasswordEmail(user.email, user.name,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);

            res.status(200).json({ success: true, message: "Password reset link sent to your email" });




        } catch (error) {
            console.log("Error in forgotPassword ", error);
            res.status(400).json({ success: false, message: error.message })
            
        }
    }


    export const resetPassword = async (req, res) => {
        try {
            const { token } = req.params
            const { password } = req.body

            const user = await User.findOne({
                resetPasswordToken: token,
                resetPasswordExpiresAt: { $gt: Date.now()}
            })

            if (!user) {
                return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
            }

            const hashedPassword = await bcryptjs.hash(password, 10);

            
            user.password = hashedPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpiresAt = undefined;
            await user.save();


            await sendResetSuccessEmail(user.email, user.name);
            res.status(200).json({ success: true, message: "Password reset successful" });


        } catch (error) {

            console.log("Error in resetPassword ", error);
            res.status(400).json({ success: false, message: error.message });
            
        }

    }


    export const checkAuth = async (req, res) => {
        try {
            const user = await User.findById(req.userId).select("-password");
            if (!user) {
                return res.status(400).json({ success: false, message: "User not found" });
            }

            res.status(200).json({ success: true, user });
        } catch (error) {
            console.log("Error in checkAuth ", error);
            res.status(400).json({ success: false, message: error.message });
        }
    };


export const googleCallback = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, message: "Auth failed" });

    if (user.isMfaEnabled) {
      // Issue temporary MFA token (like password login)
      const mfaToken = crypto.randomBytes(20).toString("hex");
      user.mfaTempToken = mfaToken;
      user.mfaTempTokenExpires = Date.now() + 5 * 60 * 1000; // 5 min
      await user.save();

      // Redirect to MFA page with token in query param
      return res.redirect(`${process.env.CLIENT_URL}/mfa-login?tempToken=${mfaToken}&email=${user.email}`);
    }

    // No MFA → full login
    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();
    res.redirect(`${process.env.CLIENT_URL}/`);
  } catch (err) {
    console.error("Google callback error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


    // Generate MFA secret and QR code
    export const generateMfaSetup = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        // Generate secret
        const secret = speakeasy.generateSecret({ name: `MyApp (${user.email})` });

        // Save secret temporarily (not enabling MFA yet)
        user.mfaTempSecret = secret.base32;
        await user.save();

        // Generate QR code for frontend
        const qrCodeDataURL = await QRCode.toDataURL(secret.otpauth_url);

        res.status(200).json({ success: true, qrCodeDataURL, secret: secret.base32 });
    } catch (error) {
        console.log("Error in generateMfaSetup:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
    };

    // Verify MFA token and enable MFA
    export const verifyMfa  = async (req, res) => {
  const { token, tempToken } = req.body;
  console.log("verifyMfa called with:", { token, tempToken });

  try {
    const user = await User.findOne({
      mfaTempToken: tempToken,
      mfaTempTokenExpires: { $gt: Date.now() },
    });
    console.log("User found for MFA verification:", user ? user.email : null);

    if (!user) return res.status(400).json({ success: false, message: "Invalid or expired session. Anyway code reached here." });

    if (!user.mfaSecret) return res.status(400).json({ success: false, message: "MFA not setup" });

    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: "base32",
      token,
      window: 1,
    });
    console.log("MFA verified result:", verified);

    if (!verified) return res.status(400).json({ success: false, message: "Invalid MFA code" });

    // Generate full JWT now
    generateTokenAndSetCookie(res, user._id);

    // Clear temporary MFA token
    user.mfaTempToken = undefined;
    user.mfaTempTokenExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "MFA verified, logged in",
      user: { ...user._doc, password: undefined }
    });

  } catch (error) {
    console.log("Error in verifyMfa backend:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const verifyMfaSetup = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findById(req.userId);

    if (!user || !user.mfaTempSecret)
      return res.status(400).json({ success: false, message: "MFA not initiated" });

    // Verify token with temp secret
    const verified = speakeasy.totp.verify({
      secret: user.mfaTempSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!verified)
      return res.status(400).json({ success: false, message: "Invalid MFA code" });

    // Enable MFA
    user.mfaSecret = user.mfaTempSecret;
    user.mfaTempSecret = undefined;
    user.isMfaEnabled = true;  // <-- THIS WAS MISSING
    await user.save();

    res.status(200).json({
      success: true,
      message: "MFA setup successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log("Error in verifyMfaSetup:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};