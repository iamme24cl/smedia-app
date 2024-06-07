const requests = {
    loginUser: () => `/auth/login`,
    fetchPosts: () => `/posts/`,
    likePost: (postId) => `/posts/${postId}/like`,
    unlikePost: (postId) => `/posts/${postId}/like`,
}

export default requests;

