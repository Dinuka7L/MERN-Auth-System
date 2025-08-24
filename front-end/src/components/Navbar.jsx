import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useAuthStore } from "../store/authStore";
import { User } from "lucide-react";

const Navbar = () => {
  const { user, logout, updateProfilePicture } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const [editingProfile, setEditingProfile] = useState(false);
  const [newProfileUrl, setNewProfileUrl] = useState(user?.profilePictureUrl || "");
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        !document.getElementById("user-popup")?.contains(event.target)
      ) {
        setMenuOpen(false);
        setEditingProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const handleSaveProfileUrl = async () => {
    await updateProfilePicture(newProfileUrl);
    setEditingProfile(false);
  };

  const openMenu = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPopupPos({ top: rect.bottom + 10, left: rect.right - 288 });
    }
    setMenuOpen((prev) => !prev);
  };

  // Helper to get profile picture (returns null if none)
  const getProfilePic = () =>
    user?.profilePictureUrl || user?.googleProfilePic || null;

  return (
    <div className="w-full bg-gray-900 bg-opacity-90 backdrop-blur-lg border-b border-gray-700 px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-600">
        Dashboard
      </h1>

      <div className="relative flex items-center gap-3">
        <span className="text-gray-300 font-medium hidden sm:block">
          {user?.name || "Guest"}
        </span>

        {/* Profile button */}
        <button ref={buttonRef} onClick={openMenu}>
          {getProfilePic() ? (
            <img
              src={getProfilePic()}
              alt="profile"
              className="w-10 h-10 rounded-full border border-gray-600 shadow-sm hover:ring-2 hover:ring-cyan-500 transition object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full border border-gray-600 shadow-sm hover:ring-2 hover:ring-cyan-500 transition flex items-center justify-center bg-gray-700/50">
              <User className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </button>

        {/* User popup */}
        {typeof document !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  id="user-popup"
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, duration: 0.25 }}
                  style={{ position: "absolute", top: popupPos.top, left: popupPos.left, width: 288 }}
                  className="bg-gray-800/90 backdrop-blur-xl border border-gray-700 rounded-2xl p-5 shadow-2xl z-[9999]"
                >
                  {/* Profile info */}
                  <div className="flex items-center gap-3">
                    {getProfilePic() ? (
                      <img
                        src={getProfilePic()}
                        alt="profile"
                        className="w-12 h-12 rounded-full border border-gray-600"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center bg-gray-700/50">
                        <User className="w-7 h-7 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <p className="text-white font-semibold">{user?.name}</p>
                      <p className="text-sm text-gray-400">{user?.email}</p>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-gray-300 space-y-2">
                    {editingProfile ? (
                      <div className="flex flex-col gap-2">
                        <input
                          value={newProfileUrl}
                          onChange={(e) => setNewProfileUrl(e.target.value)}
                          placeholder="Enter image URL"
                          className="p-2 rounded bg-gray-700 border border-gray-600 text-white"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveProfileUrl}
                            className="flex-1 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingProfile(false)}
                            className="flex-1 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setEditingProfile(true)}
                          className="text-blue-400 underline text-sm"
                        >
                          Edit Profile Picture
                        </motion.button>

                        <p>
                          <span className="font-medium">Status:</span>{" "}
                          <span className={user?.isVerified ? "text-green-400" : "text-red-400"}>
                            {user?.isVerified ? "Verified ✅" : "Not Verified ❌"}
                          </span>
                        </p>
                      </>
                    )}

                    <p>
                      <span className="font-medium">Account Created:</span>{" "}
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Last Login:</span>{" "}
                      {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : "N/A"}
                    </p>

                    <p>
                      <span className="font-medium">MFA Status:</span>{" "}
                      {user?.isMfaEnabled ? (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => (window.location.href = "/setup-mfa")}
                          className="text-green-400 font-medium underline hover:text-lime-500 transition"
                        >
                          Enabled ✅ - Go to Setup
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => (window.location.href = "/setup-mfa")}
                          className="text-red-400 font-medium underline hover:text-red-500 transition"
                        >
                          Disabled ❌ - Setup MFA
                        </motion.button>
                      )}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="mt-4 w-full py-2 px-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-medium shadow hover:from-blue-600 hover:to-cyan-700 transition"
                  >
                    Logout
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}
      </div>
    </div>
  );
};

export default Navbar;
