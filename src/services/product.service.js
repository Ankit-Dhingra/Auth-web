import api from "../utils/axios";

export const getAllProducts = async (userData) => api.post("/products/getProducts", userData);

