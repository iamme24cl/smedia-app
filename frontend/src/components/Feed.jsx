import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Post from './Post';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { fetchPosts } from '../api/postApi';

const Feed = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        setError('Failed to fetch posts');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [])

  if (loading) {
    return (
      <Box flex={4} p={2} display={"flex"} justifyContent={"center"}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box flex={4} p={2} display="flex" justifyContent="center">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box flex={4} p={2}>
      {posts.length > 0 ? (
        posts.map((post) => <Post  key={post.id} post={post} user={user} />)
      ) : (
        <Typography />
      )}
    </Box>
  );
}

export default Feed;