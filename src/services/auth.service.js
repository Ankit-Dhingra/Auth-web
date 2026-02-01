import api from "../utils/axios";

export const signUp = async (userData) => api.post('/auth/signup', userData);
export const getUser = async () => api.get('/auth/me');