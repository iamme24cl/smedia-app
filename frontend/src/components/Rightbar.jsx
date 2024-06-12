import React, { useEffect, useState } from 'react';
import { Box, 
  Typography, 
  Avatar, 
  AvatarGroup, 
  ImageList, 
  ImageListItem,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar 
} from '@mui/material';
import { fetchOnlineFriends, fetchUserLatestConversations } from '../api';

const images = [
  {"src": "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg", "alt": "pancakes"},
  {"src": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg", "alt": "salad"},
  {"src": "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg", "alt": "fruits"},
  {"src": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg", "alt": "noodles"},
  {"src": "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg", "alt": "pasta"},
  {"src": "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg", "alt": "samosas"},
  {"src": "https://images.pexels.com/photos/3926123/pexels-photo-3926123.jpeg", "alt": "momos"},
  {"src": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg", "alt": "fish"}
]

const Rightbar = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  // const [photos, setPhotos] = useState([]);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [friendsData, conversationsData] = await Promise.all([
          fetchOnlineFriends(),
          fetchUserLatestConversations(userId)
        ]);
        setFriends(friendsData);
        // setPhotos(photosData);
        setConversations(conversationsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position={"fixed"} width={300}>
        <Typography variant='h6' fontWeight={300}>
          Online Friends
        </Typography>
        <AvatarGroup max={7}>
          {friends.map((friend, i) => (
            <Avatar key={i} alt={friend.name} src={friend.avatar} />
          ))}
        </AvatarGroup>
        <Typography variant='h6' fontWeight={300} mt={2} mb={2}>
          Latest Photos
        </Typography>
        <ImageList cols={3} rowHeight={100} gap={5}>
          {images.map((photo, i) => (
            <ImageListItem key={i}>
              <img src={photo.src} alt={photo.alt} />
            </ImageListItem>
          ))}
        </ImageList>
        <Typography variant='h6' fontWeight={300} mt={2}>
          Latest Conversations
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {conversations.map((conv, i) => (
            <React.Fragment key={i}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={conv.name} src={conv.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={conv.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {conv.sender}
                      </Typography>
                      {` — ${conv.message}`}
                    </React.Fragment>
                  }
                />
              </ListItem>
              {i < conversations.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default Rightbar;