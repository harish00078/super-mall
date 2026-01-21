import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api";


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  getMe: () => api.get("/auth/me"),
};

// Shops API
export const shopsAPI = {
  getAll: (params) => api.get("/shops", { params }),
  getById: (id) => api.get(`/shops/${id}`),
  getByFloor: (floorId) => api.get(`/shops/floor/${floorId}`),
  getByCategory: (categoryId) => api.get(`/shops/category/${categoryId}`),
  create: (data) => api.post("/shops", data),
  update: (id, data) => api.put(`/shops/${id}`, data),
  delete: (id) => api.delete(`/shops/${id}`),
};

// Products API
export const productsAPI = {
  getAll: (params) => api.get("/products", { params }),
  getById: (id) => api.get(`/products/${id}`),
  getOffers: () => api.get("/products/offers"),
  compare: (ids) => api.get("/products/compare", { params: { ids: ids.join(",") } }),
  create: (data) => api.post("/products", data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get("/categories"),
  getById: (id) => api.get(`/categories/${id}`),
  create: (data) => api.post("/categories", data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};

// Floors API
export const floorsAPI = {
  getAll: () => api.get("/floors"),
  getById: (id) => api.get(`/floors/${id}`),
  create: (data) => api.post("/floors", data),
  update: (id, data) => api.put(`/floors/${id}`, data),
  delete: (id) => api.delete(`/floors/${id}`),
};

// Offers API
export const offersAPI = {
  getAll: (params) => api.get("/offers", { params }),
  getAllAdmin: () => api.get("/offers/all"),
  getById: (id) => api.get(`/offers/${id}`),
  create: (data) => api.post("/offers", data),
  update: (id, data) => api.put(`/offers/${id}`, data),
  delete: (id) => api.delete(`/offers/${id}`),
  applyToProducts: (id, productIds) => api.post(`/offers/${id}/apply`, { productIds }),
};

export default api;
