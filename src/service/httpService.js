import axios from "axios";
import { useUserStore } from "../store/user";

const link = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Add a request interceptor to include the bearer token from localStorage in the headers
link.interceptors.request.use((config) => {
  // Get the access token from localStorage
  const accessToken = localStorage.getItem("accessToken");
  // console.log("accessToken",accessToken)
  // Set the Authorization header with the bearer token
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

const http = {
  get: link.get,
  delete: link.delete,
  post: link.post,
  put: link.put,
  patch: link.patch,
};

export default http;
