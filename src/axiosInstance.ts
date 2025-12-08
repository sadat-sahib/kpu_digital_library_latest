import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://kpu-backend-repo.onrender.com',
  withCredentials: true,
});

export default axiosInstance;
