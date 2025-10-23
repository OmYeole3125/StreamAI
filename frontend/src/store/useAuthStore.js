import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isRegistering: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  isAuthenticate: async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (user && token) {
        set({ authUser: user, token });
      } else {
        throw new Error("Unauthenticated");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Sign-up / Sign-in to access StreamAI");
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  register: async (data) => {
    set({ isRegistering: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);

      const { user, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      set({ authUser: user, token });
      toast.success("Account created successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed!");
    } finally {
      set({ isRegistering: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);

      const { user, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      set({ authUser: user, token });
      toast.success("Logged in successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ authUser: null, token: null });
    toast.success("Logged out successfully!");
  },

  updateProfile: async (data) => {},
}));
