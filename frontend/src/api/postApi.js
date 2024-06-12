import axiosInstance from './axiosConfig';
import requests from './requests';  

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

const createPost = async (postData) => {
    try {
        const token = localStorage.getItem('smedia-token');
        const response = await axiosInstance.post('/posts/', postData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};


export { fetchPosts, toggleLike, createPost };
