import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const gmailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // 👈 allows self-signed certs
  },
});

export const sender = {
  email: process.env.GMAIL_USER,
  name: "D Walker from MERN AUTH",
};
