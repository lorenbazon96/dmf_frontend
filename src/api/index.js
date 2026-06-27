import axios from "axios";

export const apiBaseURL = process.env.VUE_APP_API_URL || "http://localhost:3000/api";
export const backendBaseURL = apiBaseURL.replace(/\/api\/?$/, "");

const api = axios.create({
  baseURL: apiBaseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("dmf_token") || sessionStorage.getItem("dmf_token");

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
