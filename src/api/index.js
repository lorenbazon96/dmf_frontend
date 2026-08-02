import axios from "axios";

const configuredURL = process.env.VUE_APP_API_URL || process.env.VITE_API_URL;
export const apiBaseURL = configuredURL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:3000/api" : "/api");
export const backendBaseURL = apiBaseURL.replace(/\/api\/?$/, "");

export function clearStoredAuth() {
  for (const storage of [localStorage, sessionStorage]) {
    storage.removeItem("dmf_user");
    storage.removeItem("dmf_token");
    storage.removeItem("dmf_guest");
  }
}

export function normalizeApiError(error) {
  const status = error.response?.status || null;
  const data = error.response?.data;
  const message = data?.error || data?.message ||
    (error.code === "ERR_NETWORK" ? "Nije moguće povezati se s poslužiteljem." : error.message) ||
    "Dogodila se neočekivana pogreška.";
  error.status = status;
  error.userMessage = message;
  error.isApiError = true;
  return error;
}

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

api.interceptors.response.use(
  response => response,
  error => {
    const normalized = normalizeApiError(error);
    if (normalized.status === 401) {
      clearStoredAuth();
      window.dispatchEvent(new CustomEvent("dmf:session-expired", { detail: normalized }));
    } else {
      window.dispatchEvent(new CustomEvent("dmf:api-error", { detail: normalized }));
    }
    return Promise.reject(normalized);
  },
);

export default api;
