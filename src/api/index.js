import axios from "axios";
import i18n from "../i18n";

const errorCodeKeys = {
  COMPLETED_PROJECT_IMMUTABLE: "completedProjectImmutable",
  COMPANY_ACCESS_DENIED: "companyAccessDenied",
  CONFIRM_NAME_MISMATCH: "confirmNameMismatch",
  DUPLICATE_COMPANY: "duplicateCompany",
  DUPLICATE_RN: "duplicateRn",
  DUPLICATE_RESOURCE: "duplicateResource",
  DUPLICATE_WAREHOUSE_ITEM: "duplicateWarehouseItem",
  INSUFFICIENT_AVAILABLE_STOCK: "insufficientStock",
  INVALID_MATERIAL_QUANTITY: "invalidMaterialQuantity",
  INVALID_TASK_TRANSITION: "invalidTaskTransition",
  INVALID_TRANSITION: "invalidTransition",
  INVALID_WORKER: "invalidWorker",
  INVALID_WORKER_INDEX: "invalidWorker",
  INVENTORY_CONFLICT: "inventoryConflict",
  NOT_FOUND: "notFound",
  PROJECT_CONFLICT: "projectConflict",
  PROJECT_NOT_RUNNING: "projectNotRunning",
  TASK_ALREADY_STARTED: "taskAlreadyStarted",
  TASK_NOT_FOUND: "taskNotFound",
  UNRESOLVED_WAREHOUSE_ITEM: "unresolvedMaterial",
  WAREHOUSE_ITEM_IN_USE: "warehouseItemInUse",
  WORKER_BUSY: "workerBusy",
  WORKER_REQUIRED: "workerRequired",
};

const errorMessageKeys = {
  "Admin access required": "adminAccessRequired",
  "At least one worker is required": "workerRequired",
  "Authentication required": "authenticationRequired",
  "Company access denied": "companyAccessDenied",
  "Company already exists": "duplicateCompany",
  "Email already exists": "emailAlreadyExists",
  "Forbidden": "forbidden",
  "Internal server error": "serverError",
  "Invalid credentials": "invalidCredentials",
  "Invalid or expired token": "invalidOrExpiredToken",
  "Invalid request": "invalidRequest",
  "Material cannot be uniquely linked": "unresolvedMaterial",
  "No file uploaded": "noFileUploaded",
  "Not found": "notFound",
  "Only PDF and DWG files are allowed": "invalidFileType",
  "Project was modified": "projectConflict",
  "Resource already exists": "duplicateResource",
  "Upload rejected": "uploadRejected",
  "User not found": "userNotFound",
  "Worker company mismatch": "invalidWorker",
};

const statusKeys = {
  400: "invalidRequest",
  401: "invalidOrExpiredToken",
  403: "forbidden",
  404: "notFound",
  409: "invalidRequest",
  422: "invalidRequest",
  429: "tooManyRequests",
  500: "serverError",
};

function translateError(key) {
  return i18n.global.t(`apiErrors.${key}`);
}

const configuredURL = process.env.VUE_APP_API_URL || process.env.VITE_API_URL;
export const apiBaseURL = configuredURL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:3000/api" : "/api");
export const backendBaseURL = apiBaseURL.replace(/\/api\/?$/, "");

export function clearStoredAuth() {
  for (const storage of [localStorage, sessionStorage]) {
    storage.removeItem("dmf_user");
    storage.removeItem("dmf_token");
  }
}

export function normalizeApiError(error) {
  const status = error.response?.status || null;
  const data = error.response?.data;
  const serverMessage = data?.error || data?.message;
  const key = errorCodeKeys[data?.code] || errorMessageKeys[serverMessage] ||
    (error.code === "ERR_NETWORK" ? "network" : statusKeys[status]);
  const message = key ? translateError(key) : translateError("unexpected");
  error.status = status;
  error.message = message;
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
    const url = error.config?.url || "";
    const isPublicAuthRequest = /^\/auth\/(login|forgot-password|reset-password)/.test(url);
    const hadAuthToken = Boolean(error.config?.headers?.Authorization);
    if (normalized.status === 401 && hadAuthToken && !isPublicAuthRequest) {
      clearStoredAuth();
      window.dispatchEvent(new CustomEvent("dmf:session-expired", { detail: normalized }));
    } else if (!error.config?.suppressGlobalError) {
      window.dispatchEvent(new CustomEvent("dmf:api-error", { detail: normalized }));
    }
    return Promise.reject(normalized);
  },
);

export default api;
