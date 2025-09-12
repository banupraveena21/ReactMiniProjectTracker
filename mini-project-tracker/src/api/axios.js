
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor to handle global errors and logs
instance.interceptors.response.use(
  response => {
    // you can log or modify here
    return response;
  },
  async error => {
    if (!error.response) {
      // network error
      alert("Network error. Please check your connection.");
    } else {
      const status = error.response.status;
      if (status === 401) {
        // optionally refresh token or redirect to login
        // localStorage.removeItem('access_token');
        // redirect to login
      }
      // handle validation errors, etc.
    }
    return Promise.reject(error);
  }
);

export default instance;
