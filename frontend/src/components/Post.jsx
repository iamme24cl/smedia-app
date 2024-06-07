import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toggleLike } from '../api/postApi';

const Post = ({ post, user }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!user) {
      console.log("User is undefined!")
      return;
    }
    // Check if the current user has liked the post
    const userLiked = post.likes.some(like => like.user_id === user.id);

    setLiked(userLiked);
  }, [post.likes, user.id, user]);

  const handleLikeToggle = async () => {
    try {
      await toggleLike(post.id, liked);
      const updatedLiked = !liked;
      setLiked(updatedLiked);
    } catch (error) {
      console.log("Error toggling like status: ", error);
    }
  };

  return (
    <Card sx={{ margin: "5px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ width: 30, height: 30 }} src={user.avatar} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user.name}
        subheader="October 6, 2023"
      />
      <CardMedia
        component="img"
        sx={{ maxHeight: 300, objectFit: "cover" }}
        image={post.image && post.image}
        alt="Post image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
            checked={liked}
            onChange={handleLikeToggle}
          />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
