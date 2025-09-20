import axios from "axios";
import { useAdminAuthStore } from "../../Store/useAdminAuthStore";


const authFetcher = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

authFetcher.interceptors.request.use(
  (config) => {
    const token = useAdminAuthStore.getState().token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("✅ token from Zustand:", token);
    return config;
  },
  (error) => Promise.reject(error)
);

export default authFetcher;
