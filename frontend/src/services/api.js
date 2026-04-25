import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Ensure this matches your Flask port
});

// This "Interceptor" attaches the token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;