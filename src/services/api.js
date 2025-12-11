import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен к каждому запросу, если он есть
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

// Обработка ошибок ответа
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (email, password) => {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  },
};

export const recipesAPI = {
  getAll: async (search = '') => {
    const response = await api.get('/recipes', {
      params: { search },
    });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  },
  create: async (recipeData) => {
    const response = await api.post('/recipes', recipeData);
    return response.data;
  },
};

export const ingredientsAPI = {
  getAll: async () => {
    const response = await api.get('/ingredients');
    return response.data;
  },
};

export default api;

