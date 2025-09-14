import axios from 'axios';
import { sesionStorage  } from '@/store/sesion';
const session = sesionStorage();

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:3005/',
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    async (config) => {
        if (!config.headers['Content-Type']) {
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // const originalRequest = error.config;
        /*if (error.response.status === 401 && originalRequest.url.includes('/api/auth/refresh/')) {
            return Promise.reject(error);
        }*/
        if (error?.code === "ERR_NETWORK") {
          session.setExpiredSession();
        }
        else if (error.response.status === 401) {
            try {
              session.setExpiredSession();
            } catch (err) {
                return Promise.reject(err);
            }
            // }
        }

        return Promise.reject(error?.response);
    }
);

export default axiosInstance;
