import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { AccountBox, Settings } from '@mui/icons-material';
import ArticleIcon from '@mui/icons-material/Article';
import GroupsIcon from '@mui/icons-material/Groups';
import StoreIcon from '@mui/icons-material/Store';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ModeNightIcon from '@mui/icons-material/ModeNight';

const Sidebar = ({ mode, setMode }) => {
  return (
    <Box 
      flex={1} p={2} 
      sx={{ display: { xs: "none", sm: "block" }}}
    >
      <Box position={"fixed"}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Pages" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <StoreIcon/>
              </ListItemIcon>
              <ListItemText primary="Marketplace" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <ModeNightIcon />
              </ListItemIcon>
              <Switch onChange={(e) => setMode(mode === "light" ? "dark" : "light")} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;