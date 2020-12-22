import axios from 'axios';

const REQUEST_TIMEOUT = 25000;

const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
