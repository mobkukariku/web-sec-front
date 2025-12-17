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
  register: async (name, email, password) => {
    const response = await api.post('/register', { name, email, password });
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
  getMyRecipes: async (userId) => {
    const response = await api.get(`/my-recipes/${userId}`);
    return response.data;
  },
  create: async (recipeData) => {
    const response = await api.post('/recipes', recipeData);
    return response.data;
  },
  update: async (id, recipeData) => {
    const response = await api.put(`/recipes/${id}`, recipeData);
    return response.data;
  },
};

export const ingredientsAPI = {
  getAll: async () => {
    const response = await api.get('/ingredients');
    return response.data;
  },
};

export const profileAPI = {
  getProfile: async (userId) => {
    const response = await api.get(`/profile/${userId}`);
    return response.data;
  },
  updateProfile: async (userId, profileData) => {
    const response = await api.put(`/profile/${userId}`, profileData);
    return response.data;
  },
};

export default api;

