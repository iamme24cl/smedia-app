import axios from "axios";
import baseUrl from "./constants";


const axiosInstance = axios.create({
    baseURL: baseUrl
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Token has expired or unauthorized, direct to logout component
            window.location.href = '/logout';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;