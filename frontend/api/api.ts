import axios from 'axios';

const API = axios.create({
  baseURL: 'http://10.48.151.232:8000/api', // для Android-эмулятора
  // baseURL: 'http://localhost:8000/api', // для web
});

export default API;
