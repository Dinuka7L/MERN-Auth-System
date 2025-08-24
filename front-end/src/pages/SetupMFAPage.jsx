import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const SetupMFAPage = () => {
  const { setupMfa, verifyMfaSetup, user } = useAuthStore();
  const [qrCode, setQrCode] = useState(null);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mfaSetupDone, setMfaSetupDone] = useState(false);
  const [countdown, setCountdown] = useState(5);
  

  const navigate = useNavigate();

  // Fetch QR code
  useEffect(() => {
    const fetchQr = async () => {
      try {
        setIsLoading(true);
        const qr = await setupMfa();
        setQrCode(qr);
      } catch (error) {
        toast.error(error.message || "Error generating QR code");
      } finally {
        setIsLoading(false);
      }
    };
    fetchQr();
  }, []);

  // Handle verify button
  const handleVerify = async () => {
  if (!token) return toast.error("Enter the code from your authenticator app");
  try {
    setIsLoading(true);
    const data = await verifyMfaSetup(token.trim());
    toast.success("MFA setup successfully!");
    setToken("");
    setMfaSetupDone(true);
  } catch (error) {
    toast.error(error.message || "Invalid token");
  } finally {
    setIsLoading(false);
  }
};
  // Countdown redirect after MFA setup
  useEffect(() => {
  if (!mfaSetupDone) return;

  const timer = setInterval(() => {
    setCountdown((prev) => prev - 1);
    }, 1000);

  return () => clearInterval(timer);
    }, [mfaSetupDone]);

    useEffect(() => {
  if (countdown <= 0 && mfaSetupDone) {
    navigate("/");
    }
    }, [countdown, mfaSetupDone, navigate]);

  return (
    <div className="min-h-screen flex flex-col text-white
      bg-gradient-to-br from-[#0b122e]/95 via-[#0a2740]/90 to-[#07364a]/85">
      <Navbar />

      <main className="flex-1 w-full flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full max-w-3xl bg-gray-800/80 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-2xl p-8 flex flex-col items-center"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 text-center">
            {mfaSetupDone || user?.isMfaEnabled
              ? "MFA Is Enabled "
              : "Setup Multi-Factor Authentication"}
          </h1>

          {isLoading && <p className="text-gray-300 mb-4">Loading...</p>}

          {qrCode && (
            <div className="flex flex-col items-center w-full">
              <p className="mb-4 text-gray-300 text-center text-sm sm:text-base">
                Scan this QR code with Google Authenticator or Authy
              </p>
              <img
                src={qrCode}
                alt="MFA QR Code"
                className="mb-6 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-xl border border-gray-700 shadow-lg"
              />

              {/* Show verify input only if MFA not done */}
              {!mfaSetupDone && !user?.isMfaEnabled && (
                <>
                  <p className="mb-2 text-gray-300 text-center text-sm sm:text-base">
                    Then enter the 6-digit code below:
                  </p>
                  <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="text-black p-3 rounded mb-4 w-full text-center font-medium text-lg"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleVerify}
                    className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-700 transition text-lg"
                  >
                    Verify & Enable MFA
                  </motion.button>
                </>
              )}

              {/* Success / already enabled */}
              {(user?.isMfaEnabled) && (
                <>
                  <p className="mt-4 mb-4 text-green-400 font-semibold text-center text-lg">
                    MFA is enabled ✅
                  </p>
                  {(mfaSetupDone) && ( <><p className="text-gray-300 mb-4 text-center">
                    Redirecting to dashboard in {countdown} seconds...
                  </p> </>)}
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate("/")}
                    className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-cyan-600 transition text-lg"
                  >
                    Back to Dashboard
                  </motion.button>
                </>
              )}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default SetupMFAPage;
