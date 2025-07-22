// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Configure Axios
axios.defaults.baseURL = 'http://localhost:8000' && 'https://nyangi-market.onrender.com';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

// Fetch CSRF token
const fetchCsrfToken = async () => {
  try {
    const response = await axios.get('/api/get-csrf/');
    console.log('CSRF token fetched:', response.data.csrfToken);
    return response.data.csrfToken;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
    toast.error('Failed to initialize CSRF token. Please refresh the page.');
    throw error;
  }
};

// Initialize CSRF token before rendering
fetchCsrfToken().then(() => {
  // Debug Axios requests
  axios.interceptors.request.use(
    request => {
      console.log('Axios request:', request.method, request.url, 'CSRF Token:', request.headers['X-CSRFToken'] || 'undefined');
      return request;
    },
    error => {
      console.error('Axios request error:', error);
      return Promise.reject(error);
    }
  );

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
      <ToastContainer />
    </React.StrictMode>
  );
});