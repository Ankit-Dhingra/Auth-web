import axios from "axios";
import { config } from "../../config";
import { refreshToken } from "../services/auth.service";

const api = axios.create({
  baseURL: config.API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const AUTH_ROUTES = [
  "/auth/login",
  "/auth/signup",
  "/auth/refresh",
  "/auth/request-otp",
  "/auth/verify-otp",
];

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // ❌ no response or not unauthorized
//     if (!error.response || error.response.status !== 401) {
//       return Promise.reject(error);
//     }

//     // ❌ NEVER refresh for refresh API itself
//     if (originalRequest.url.includes("/auth/refresh")) {
//       return Promise.reject(error);
//     }

//     // ❌ auth routes should not trigger refresh
//     if (
//       originalRequest.url.includes("/auth/login") ||
//       originalRequest.url.includes("/auth/signup") ||
//       originalRequest.url.includes("/auth/request-otp") ||
//       originalRequest.url.includes("/auth/verify-otp")
//     ) {
//       return Promise.reject(error);
//     }

//     // ❌ prevent retry loop
//     if (originalRequest._retry) {
//       return Promise.reject(error);
//     }

//     originalRequest._retry = true;

//     // 🔁 queue handling
//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {
//         failedQueue.push({ resolve, reject });
//       })
//         .then(() => api(originalRequest))
//         .catch((err) => Promise.reject(err));
//     }

//     isRefreshing = true;

//     try {
//       await refreshToken();
//       processQueue(null);
//       return api(originalRequest);
//     } catch (refreshError) {
//       processQueue(refreshError);

//       // 🔥 HARD LOGOUT (no retry possible)
//       window.location.href = "/login";

//       return Promise.reject(refreshError);
//     } finally {
//       isRefreshing = false;
//     }
//   },
// );

export default api;

// import axios from "axios";
// import { config } from "../../config";
// import { refreshToken } from "../services/auth.service";

// const api = axios.create({
//   baseURL: config.API_BASE_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       console.error("API Error:", error.response.status, error.response.data);
//     }
//     if (error.response.status === 401) {
//       // Handle unauthorized access, e.g., redirect to login
//       const tokenRefresh = async () => {
//         try {
//           await refreshToken();
//         } catch (error) {
//           console.log("Token refresh failed", error);
//         }
//       };
//       tokenRefresh();
//     }
//     return Promise.reject(error);
//   },
// );

// export default api;
