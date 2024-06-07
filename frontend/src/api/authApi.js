import axiosInstance from "./axiosConfig";
import requests from "./requests";

const login = async (formData) => {
    try {
        const response = await axiosInstance.post(requests.loginUser(), formData);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export default login;
