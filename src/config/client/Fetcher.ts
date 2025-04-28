// utils/fetcher.ts
import axios from "axios";

const fetcher = axios.create({
  baseURL: "http://localhost:8000", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default fetcher;
