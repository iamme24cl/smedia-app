import React from 'react';
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

const Rightbar = () => {
  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" }}}>
        <Box position={"fixed"} width={300}>
          <Typography variant='h6' fontWeight={300}>
            Online Friends
          </Typography>
          <AvatarGroup max={7}>
            <Avatar alt="Remy Sharp" src="https://randomuser.me/api/portraits/thumb/men/53.jpg" />
            <Avatar alt="Tanya Howard" src="https://randomuser.me/api/portraits/thumb/women/17.jpg" />
            <Avatar alt="Cindy Baker" src="https://randomuser.me/api/portraits/thumb/women/69.jpg" />
            <Avatar alt="Agnes Walker" src="https://randomuser.me/api/portraits/thumb/men/65.jpg" />
            <Avatar alt="Trevor Henderson" src="" />
            <Avatar alt="Nora Howard" src="https://randomuser.me/api/portraits/thumb/women/17.jpg" />
            <Avatar alt="Karla Baker" src="https://randomuser.me/api/portraits/thumb/women/33.jpg" />
            <Avatar alt="Howard Hall" src="https://randomuser.me/api/portraits/thumb/men/34.jpg" />
            <Avatar alt="Jack Henderson" src="https://randomuser.me/api/portraits/thumb/men/59.jpg" />
          </AvatarGroup>
          <Typography variant='h6' fontWeight={300} mt={2} mb={2}>
              Latest Photos
          </Typography>
          <ImageList cols={3} rowHeight={100} gap={5}>
            {images.map(image => {
              return (
                <ImageListItem>
                  <img 
                    src={image.src}
                    alt={image.alt} 
                  />
                </ImageListItem>
              );
            })}
          </ImageList>
          <Typography variant='h6' fontWeight={300} mt={2}>
              Latest Conversations
          </Typography>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Summer BBQ"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      to Scott, Alex, Jennifer
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Oui Oui"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Sandra Adams
                    </Typography>
                    {' — Do you have Paris recommendations? Have you ever…'}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Box>
    </Box>
  );
}

export default Rightbar;