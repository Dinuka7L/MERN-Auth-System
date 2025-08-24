  import FloatingShape from "./components/floatingShape";
  import {Routes, Route, Navigate} from 'react-router-dom'
  import SignUpPage from "./pages/signUpPage";
  import LoginPage from "./pages/loginPage";
  import VerifyEmailPage from "./pages/VerifyEmailPage";
  import DashboardPage from "./pages/DashboardPage";
  import { AnimatePresence } from "framer-motion";
  import { Toaster } from "react-hot-toast";
  import ForgotPasswordPage from "./pages/ForgotPasswordPage";
  import { useAuthStore } from "./store/authStore";
  import { useEffect } from "react";
  import LoadingSpinner from "./components/LoadingSpinner";
  import MySpacePage from "./pages/MySpacePage";
  import ResetPasswordPage from "./pages/ResetPasswordPage";
  import SetupMFAPage from "./pages/SetupMFAPage";
  import MFALoginPage from "./pages/MFALoginPage.JSX";



  // Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth, mfaPending } = useAuthStore();

  if (isCheckingAuth) {
    return <div className="text-white">Checking authentication...</div>;
  }

  if (!isAuthenticated && !mfaPending) {
    return <Navigate to="/login" replace />;
  }

  if (mfaPending) {
    return <Navigate to="/mfa-login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};


  // Redirect authenticated users to homepage
  const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

    if (isCheckingAuth) {
      return <div className="text-white">Checking authentication...</div>;
    }

    if (isAuthenticated && user?.isVerified) {
      return <Navigate to="/" replace />;
    }

    return children;
  };




  function App() {
    const { isCheckingAuth, isAuthenticated, user, mfaPending, checkAuth } = useAuthStore();

    useEffect(() => {
      checkAuth();
    }, [checkAuth]);

    useEffect(() => {
    window.history.replaceState(null, "", window.location.href);
  }, []);

    if (isCheckingAuth) return <LoadingSpinner />;

    console.log("isAuthenticated check at app func", isAuthenticated);
    console.log("User stats at app func", user);

    return (
      <div className="min-h-screen bg bg-gradient-to-br from-gray-900 via to-cyan-950 via-cyan-800
      flex items-center justify-center relative overflow-hidden">
      <FloatingShape color='bg-teal-600' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color="bg-teal-500" size="w-48 h-48" top="75%" left="80%" delay={5}/>
      <FloatingShape color="bg-blue-400" size="w-32 h-32" top="45%" left="-10%" delay={2}/>  
      <FloatingShape color="bg-teal-600" size="w-32 h-32" top="25%" left="70%" delay={2}/>  


      <AnimatePresence>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-space"
              element={
                <ProtectedRoute>
                  <MySpacePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <RedirectAuthenticatedUser>
                  <SignUpPage />
                </RedirectAuthenticatedUser>
              }
            />
            <Route
              path="/login"
              element={
                <RedirectAuthenticatedUser>
                  <LoginPage />
                </RedirectAuthenticatedUser>
              }
            />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route
              path="/forgot-password"
              element={
                <RedirectAuthenticatedUser>
                  <ForgotPasswordPage />
                </RedirectAuthenticatedUser>
              }
            />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route
              path="/setup-mfa"
              element={
                <ProtectedRoute>
                  <SetupMFAPage />
                </ProtectedRoute>
              }
            />
            <Route path="/mfa-login" element={<MFALoginPage />} />
          </Routes>
        </AnimatePresence>
      
      </div>
    )
  }

  export default App;
