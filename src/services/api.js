import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/login', { email, password });
    return response.data;
  },
  register: async (email, password) => {
    const response = await api.post('/register', { email, password });
    return response.data;
  },
};

export const recipesAPI = {
  getAll: async () => {
    const response = await api.get('/recipes');
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

