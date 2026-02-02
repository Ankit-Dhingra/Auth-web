import api from "../utils/axios";

export const signUp = async (userData) => api.post("/auth/signup", userData);
export const getUser = async () => api.get("/auth/me");
export const requestOTP = async (data) => api.post("/auth/request-otp", data);
export const verifyOTP = async (data) => api.post("/auth/verify-otp", data);
