import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.VITE_API_BASE_URL, 
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 403) {
            console.error('Unauthorized, redirecting to login...');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
