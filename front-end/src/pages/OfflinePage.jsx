// src/pages/OfflinePage.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FloatingShape from "../components/floatingShape";

const OfflinePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0b122e]/95 via-[#0a2740]/90 to-[#07364a]/85 text-white px-4">
      {/* Floating shapes */}
      <FloatingShape color="bg-teal-600" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-teal-500" size="w-48 h-48" top="75%" left="80%" delay={5} />
      <FloatingShape color="bg-blue-400" size="w-32 h-32" top="45%" left="-10%" delay={2} />
      <FloatingShape color="bg-teal-600" size="w-32 h-32" top="25%" left="70%" delay={2} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10"
      >
        <h1 className="text-8xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-700 text-transparent bg-clip-text drop-shadow-lg">
          Offline
        </h1>
        <p className="mt-6 text-xl text-gray-300">
          You seem to be offline. Connect to the internet to load the app.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:to-cyan-700 transition duration-200"
        >
          Retry
        </Link>
      </motion.div>
    </div>
  );
};

export default OfflinePage;
