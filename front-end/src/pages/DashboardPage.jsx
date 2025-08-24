import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/authStore";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-white
      bg-gradient-to-br from-[#0b122e]/95 via-[#0a2740]/90 to-[#07364a]/85">
      <Navbar />

      <main className="flex-1 w-full">
        {/* centered content container that scales with screen */}
         <div className="w-full px-6 md:px-10 py-8">
          <h2 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
            Welcome {user?.name || "Guest"}
          </h2>

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.06 }}
                    className="h-48 rounded-2xl bg-gray-800/50 border border-gray-700/40 backdrop-blur-xl p-6 shadow-xl"
                  >
                    {/* skeleton content to keep exact layout/size */}
                    <div className="space-y-4">
                      <div className="h-5 w-52 rounded-md bg-gray-600/40 animate-pulse" />
                      <div className="h-4 w-3/4 rounded-md bg-gray-600/30 animate-pulse" />
                      <div className="h-9 w-28 rounded-lg bg-gray-600/30 animate-pulse mt-6" />
                    </div>
                  </motion.div>
                ))
              : Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ type: "spring", stiffness: 220, damping: 16 }}
                    className="h-48 rounded-2xl bg-gray-800/70 border border-cyan-500/20 shadow-xl backdrop-blur-xl p-6 flex flex-col justify-between hover:border-cyan-400/40"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Card {i + 1}</h3>
                      <p className="text-sm text-gray-300">
                        Some quick insights or metrics for this card.
                      </p>
                    </div>
                    <button className="self-start mt-4 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 transition">
                      View Details
                    </button>
                  </motion.div>
                ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
