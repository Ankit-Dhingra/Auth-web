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

let isRefreshing = false;
let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    debugger
    console.log("original Request : " , originalRequest)

    if (!error.response) {
      return Promise.reject(error);
    }

    const isAuthRoute =
      originalRequest.url.includes("/auth/login") ||
      originalRequest.url.includes("/auth/refresh-token");

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshToken()
          .then(() => {
            isRefreshing = false;
          })
          .catch((err) => {
            isRefreshing = false;
            throw err;
          });
      }

      try {
        await refreshPromise;
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
