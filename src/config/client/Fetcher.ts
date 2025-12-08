// utils/fetcher.ts
import axios from "axios";

const fetcher = axios.create({
  baseURL: "https://kpu-backend-repo.onrender.com", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default fetcher;
