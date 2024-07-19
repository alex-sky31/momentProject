import axios from 'axios';

const baseURL = process.env.REACT_APP_DEVELOP_API;

const axiosInstance = axios.create({
  baseURL: baseURL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      config.headers.Authorization = `Bearer ${JSON.parse(storedAuth)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
