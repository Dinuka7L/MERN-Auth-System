// src/pages/NotFoundPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen text-center bg-transparent"
    >
      {/* Big 404 */}
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="text-[12rem] font-extrabold bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-700 text-transparent bg-clip-text drop-shadow-lg"
      >
        404
      </motion.h1>

      {/* Subtext */}
      <p className="mt-6 text-xl text-gray-300">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      {/* Button back to home */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:to-cyan-700 transition duration-200"
        >
          Go Home
        </Link>
      </motion.div>

      {/* Decorative animated shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-cyan-600 rounded-full mix-blend-screen blur-3xl opacity-30"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-48 h-48 bg-blue-500 rounded-full mix-blend-screen blur-3xl opacity-30"
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default NotFoundPage;
