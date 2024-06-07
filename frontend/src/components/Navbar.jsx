import React from 'react';
import { AppBar, styled, Typography, Toolbar, Box, InputBase, Badge, Avatar, Menu } from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import MailIcon from '@mui/icons-material/Mail';
import { Notifications } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
})

const Search = styled("div")(({ theme }) => ({
    backgroundColor: "white",
    padding: "0 10px",
    borderRadius: theme.shape.borderRadius,
    width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    gap: "20px",
    alignItems: "center",
   [theme.breakpoints.up("sm")]:{
        display: "flex"
   }
}));

const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "20px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]:{
        display: "none"
    }
}));


const Navbar = ({ user }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = (action) => {
        setAnchorEl(null);
        if (action === 'logout') {
            localStorage.removeItem('smedia-token');
            navigate('/logout');
        }
    }

  return (
    <AppBar position='sticky'>
        <StyledToolbar>
            <Typography variant='h6' sx={{ display: {xs:"none", sm:"block"}}}>sMedia</Typography>
            <NewspaperIcon sx={{ display: {xs:"block", sm:"none"}}} />
            <Search><InputBase placeholder='search...' /></Search>
            <Icons>
                <Badge badgeContent={4} color="error">
                    <MailIcon />
                </Badge>
                <Badge badgeContent={2} color='error'>
                    <Notifications />
                </Badge>
                <Avatar onClick={e => handleClick(e)} sx={{ width: 30, height: 30, cursor: "pointer" }} src={user.avatar} />
            </Icons>
            <UserBox>
                <Avatar onClick={e => handleClick(e)} sx={{ width: 30, height: 30, cursor: "pointer" }} src={user.avatar} />
            </UserBox>
        </StyledToolbar>
        <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
        >
            <MenuItem onClick={() => handleClose()}>Profile</MenuItem>
            <MenuItem onClick={() => handleClose()}>My account</MenuItem>
            <MenuItem onClick={() => handleClose('logout')}>Logout</MenuItem>
        </Menu>
    </AppBar>
  );
}

export default Navbar;