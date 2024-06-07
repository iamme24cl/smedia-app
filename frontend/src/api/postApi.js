import axiosInstance from './axiosConfig';
import requests from './requests';  // Adjust the import path as needed

const fetchPosts = async () => {
    try {
        const token = localStorage.getItem('smedia-token');
        const response = await axiosInstance.get(requests.fetchPosts(), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};

const toggleLike = async (postId, liked) => {
    try {
        const token = localStorage.getItem('smedia-token');
        if (liked) {
            await axiosInstance.delete(requests.unlikePost(postId), {
                headers: { Authorization: `Bearer ${token}` },
            });
        } else {
            await axiosInstance.post(requests.likePost(postId), {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
    } catch (err) {
        throw err;
    }
};


export { fetchPosts, toggleLike };
