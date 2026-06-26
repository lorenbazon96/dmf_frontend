import axios from "axios";

export const apiBaseURL = process.env.VUE_APP_API_URL || "http://localhost:3000/api";
export const backendBaseURL = apiBaseURL.replace(/\/api\/?$/, "");

const api = axios.create({
  baseURL: apiBaseURL,
});

export default api;
