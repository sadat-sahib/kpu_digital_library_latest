import axios from "axios";


const authFetcher = axios.create({
  baseURL: "https://kpu-backend-repo.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// authFetcher.interceptors.request.use(
//   (config) => {
//     const token = useAdminAuthStore.getState().token;

//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     console.log("✅ token from Zustand:", token);
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default authFetcher;
