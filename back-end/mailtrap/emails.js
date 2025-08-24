import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
} from "./emailTemplates.js";

import { gmailTransporter, sender } from "./gmail.config.js";

// =============================
// Send Verification Email
// =============================
export const sendVerificationEmail = async (username, email, verificationToken) => {
  try {
    const response = await gmailTransporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email, // ✅ plain string
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE
        .replace("{verificationCode}", verificationToken)
        .replace("{username}", username),
    });

    console.log("Verification Email Sent:", response.messageId);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Error sending verification email: " + error.message);
  }
};

// =============================
// Send Welcome Email
// =============================
export const sendWelcomeEmail = async (email, username) => {
  try {
    const response = await gmailTransporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Welcome Aboard!",
      html: WELCOME_EMAIL_TEMPLATE
        .replace("{email}", email)
        .replace("{username}", username),
    });

    console.log("Welcome Email Sent:", response.messageId);
  } catch (error) {
    console.error("Error sending Welcome email:", error);
    throw new Error("Error sending Welcome email: " + error.message);
  }
};

// =============================
// Send Reset Password Request Email
// =============================
export const sendRestPasswordEmail = async (email, username, resetURL) => {
  try {
    const response = await gmailTransporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Password Reset - MERN Auth",
      html: PASSWORD_RESET_REQUEST_TEMPLATE
        .replace("{username}", username)
        .replace("{resetURL}", resetURL),
    });

    console.log("Password Reset Request Email Sent:", response.messageId);
  } catch (error) {
    console.error("Error sending Password Reset Request email:", error);
    throw new Error("Error sending Password Reset Request email: " + error.message);
  }
};

// =============================
// Send Reset Password Success Email
// =============================
export const sendResetSuccessEmail = async (email, username) => {
  try {
    const response = await gmailTransporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Password Reset Successful - MERN Auth",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE
        .replace("{username}", username)
        .replace("{email}", email),
    });

    console.log("Password Reset Success Email Sent:", response.messageId);
  } catch (error) {
    console.error("Error sending Password Reset Success email:", error);
    throw new Error("Error sending Password Reset Success email: " + error.message);
  }
};
