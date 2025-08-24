  import express from 'express';
  import { connectDB } from './db/connectDB.js';
  import dotenv from "dotenv";
  import authRoutes from "./routes/auth.route.js";
  import cookieParser from 'cookie-parser';
  import cors from "cors";
  import userRoutes from "./routes/user.routes.js";


  // 👇 NEW imports for Google OAuth
  import session from "express-session";
  import passport from "passport";
  import "./config/passport.js"; // Google strategy config

  dotenv.config();

  const app = express();
  const PORT = process.env.PORT || 5000;

  // ✅ Allow frontend (React) to talk to backend with credentials (cookies/JWT)
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));

  app.use(express.json()); // allows to parse incoming requests json data
  app.use(cookieParser());

  // 👇 Session middleware is required for Passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "keyboardcat", // 🔑 move to .env in prod
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // ⚠️ set secure: true in production (HTTPS only)
    })
  );

  // 👇 Initialize passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // ✅ Main auth routes (local signup/login + Google OAuth)
  app.use("/api/auth/", authRoutes);
  app.use("/api/user", userRoutes); 

  const startServer = async () => {
    try {
      await connectDB();
      app.listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  };

  startServer();
