import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Container, Paper } from "@mui/material";
import login from "../api/authApi";

const Login = ({ setAuth, setUser }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await login(formData);
            localStorage.setItem('smedia-token', data.access_token);
            localStorage.setItem('smedia-user', JSON.stringify(data.user)); // Store user object in localStorage
            setAuth(true);
            setUser(data.user)
            navigate('/');
        } catch (err) {
            setError('Invalid username or password!')
            console.log(err)
        }
    }

  return (
    <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component={"h1"} variant="h5">
                    Login
                </Typography>
                {error && <Typography color={"red"}>{error}</Typography>}
                <Box component={"form"} onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField 
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField 
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="currrent-password"
                        autoFocus
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Paper>
    </Container>
  );
};

export default Login;