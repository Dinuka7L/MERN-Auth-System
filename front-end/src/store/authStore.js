import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	mfaPending: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,
	tempToken: null,
	

	signup: async (email, password, name) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/signup`, { email, password, name });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
	},
    verifyEmail: async (code) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/verify-email`, { code });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false, error:null });
			
		} catch (error) {
			set({ error: error.response.data.message || "Error verifying email", isLoading: false });
			throw error;
		}
    },

	checkAuth: async () => {
		set ({ isCheckingAuth:true, error:null });
		try {
			const response = await axios.get(`${API_URL}/check-auth`);
			set ({ user: response.data.user, isAuthenticated:true, isCheckingAuth:false });

		} catch (error) {
			set ({isLoading: false, isAuthenticated:false, isCheckingAuth:false, error: error.response.data.message || null });
			
		}
	},





login: async (email, password) => {
  set({ isLoading: true, error: null });
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log("Login response:", response.data);

    if (response.data.mfaRequired) {
      console.log("MFA required, storing tempToken:", response.data.tempToken);

      // store info
      set({
        user: { email },
        isAuthenticated: false,
        mfaPending: true,
        tempToken: response.data.tempToken,
        isLoading: false,
      });

      // navigate to MFA page with query params
      window.location.href = `/mfa-login?tempToken=${response.data.tempToken}&email=${email}`;
      return;
    }

    // normal login
    set({
      user: response.data.user,
      isAuthenticated: true,
      mfaPending: false,
      isLoading: false,
    });
	} catch (error) {
		console.log("Error in login:", error);
		set({
		isAuthenticated: false,
		error: error.response?.data?.message || null,
		isLoading: false,
		});
	}
	},

	logout: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/logout`);
			set ({ user: response.data.user, isAuthenticated:false, isLoading:false });

		} catch (error) {
			set ({ isAuthenticated:false, error: error.response.data.message || null, isLoading: false });
		}
		set({
			user: null,
			isAuthenticated: false,
			mfaPending: false,
			tempToken: null,	
  	});

	// Force browser to not serve cached page
	window.location.replace("/login");
	},

	forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/forgot-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
	},
	

	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}
	},


	// Generate MFA QR code
	setupMfa: async () => {
	set({ isLoading: true, error: null });
	try {
		const response = await axios.get(`${API_URL}/mfa/setup`);
		set({ mfaQRCode: response.data.qrCodeDataURL, isLoading: false });
		return response.data.qrCodeDataURL;
	} catch (error) {
		set({ error: error.response?.data?.message || "Error generating MFA QR code", isLoading: false });
		throw error;
	}
	},



	// Verify MFA token
	verifyMfa: async (token, tempToken) => {
	console.log("verifyMfa called with token:", token, "tempToken:", tempToken);
	
	set({ isLoading: true, error: null });
	try {
		if (!tempToken) throw new Error("MFA session expired. Please login again.");

		const response = await axios.post(`${API_URL}/mfa/verify`, { token, tempToken });
		set({
		user: response.data.user,
		isAuthenticated: true,
		mfaPending: false,
		tempToken: undefined,
		isLoading: false,
		});

		return response.data;
	} catch (error) {
		console.log("Error in verifyMfa store function:", error);
		set({ error: error.response?.data?.message || "Error verifying MFA", isLoading: false });
		throw error;
	}
	},


	verifyMfaSetup: async (token) => {
	set({ isLoading: true, error: null });
	try {
		const response = await axios.post(`${API_URL}/mfa/setup/verify`, { token });
		console.log("verifyMfaSetup response:", response.data);

		// Update user in store
		set({ user: response.data.user, isAuthenticated: true });

		return response.data;
	} catch (error) {
		console.log("Error in verifyMfaSetup:", error);
		set({ error: error.response?.data?.message || "Error verifying MFA", isLoading: false });
		throw error;
	} finally {
		set({ isLoading: false });
	}
	},



  checkAuth: async () => {
	set({ isCheckingAuth: true, error: null, mfaPending: false });
	try {
		console.log("Checking auth status with backend...");
		const response = await axios.get(`${API_URL}/check-auth`);
		console.log("Check auth response:", response.data);
		const user = response.data.user;

		set({ user, isAuthenticated: true, mfaPending: false, isCheckingAuth: false });
	} catch (error) {
		set({
		isAuthenticated: false,
		isCheckingAuth: false,
		error: error.response?.data?.message || null
		});
	}
	},

	async updateProfilePicture(url) {
		try {
			console.log("📤 Sending profile picture update:", url);
			const { data } = await axios.put("http://localhost:5000/api/user/profile-picture", { url }, { withCredentials: true });
			console.log("✅ Response from server:", data);
			set({ user: data.user });
		} catch (err) {
			console.error("❌ Failed to update profile picture:", err.response?.data || err.message);
		}
		}


}));