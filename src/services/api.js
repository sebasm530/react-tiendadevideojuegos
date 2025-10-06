import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api', // Adjust this to match your backend API
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/usuarios/login', credentials),
  register: (userData) => api.post('/usuarios/', userData), // Fixed: backend uses POST /usuarios/ for registration
};

// Game covers API
export const coversAPI = {
  getAll: () => api.get('/camisetas'),
  getById: (id) => api.get(`/camisetas/${id}`),
  create: (coverData) => api.post('/camisetas', coverData),
  update: (id, coverData) => api.put(`/camisetas/${id}`, coverData),
  delete: (id) => api.delete(`/camisetas/${id}`),
};

export default api;