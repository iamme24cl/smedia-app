import axiosInstance from './axiosConfig';
import requests from './requests';

const fetchOnlineFriends = async () => {
    try {
        const response = await axiosInstance.get(requests.fetchOnlineFriends());
        return response.data;
    } catch (error) {
        console.error('Error fetching online friends:', error);
        throw error;
    }
};

const fetchUserLatestPhotos = async () => {
    try {
        const response = await axiosInstance.get(requests.fetchUserLatestPhotos());
        return response.data;
    } catch (error) {
        console.error('Error fetching latest photos:', error);
        throw error;
    }
};

const fetchUserLatestConversations = async (userId) => {
    try {
        const response = await axiosInstance.get(requests.fetchUserLatestConversations(userId));
        return response.data;
    } catch (error) {
        console.error('Error fetching latest conversations:', error);
        throw error;
    }
};

export { fetchOnlineFriends, fetchUserLatestPhotos, fetchUserLatestConversations };
