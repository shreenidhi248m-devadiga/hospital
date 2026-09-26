import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('medflow_user') || 'null');
    if (user) {
      config.headers.Authorization = `Bearer mock-token-${user.id}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('medflow_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// API service methods (ready for backend integration)
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data),
};

export const appointmentAPI = {
  getAll: (params) => api.get('/appointments', { params }),
  getById: (id) => api.get(`/appointments/${id}`),
  create: (data) => api.post('/appointments', data),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  cancel: (id) => api.delete(`/appointments/${id}`),
};

export const patientAPI = {
  getAll: (params) => api.get('/patients', { params }),
  getById: (id) => api.get(`/patients/${id}`),
  getRecords: (id) => api.get(`/patients/${id}/records`),
  update: (id, data) => api.put(`/patients/${id}`, data),
};

export const doctorAPI = {
  getAll: (params) => api.get('/doctors', { params }),
  getById: (id) => api.get(`/doctors/${id}`),
  getSchedule: (id, date) => api.get(`/doctors/${id}/schedule`, { params: { date } }),
};

export const queueAPI = {
  getStatus: () => api.get('/queue/status'),
  getPosition: (patientId) => api.get(`/queue/position/${patientId}`),
  addToQueue: (data) => api.post('/queue', data),
  updateQueue: (id, data) => api.put(`/queue/${id}`, data),
  removeFromQueue: (id) => api.delete(`/queue/${id}`),
};
