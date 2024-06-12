const requests = {
    loginUser: () => `/auth/login`,
    fetchPosts: () => `/posts/`,
    likePost: (postId) => `/posts/${postId}/like`,
    unlikePost: (postId) => `/posts/${postId}/like`,
    fetchOnlineFriends: () => `/users/online-users`,
    fetchUserLatestPhotos: () => `/users/latest-photos`,
    fetchUserLatestConversations: (userId) => `/users/${userId}/latest-conversations`,
};

export default requests;
