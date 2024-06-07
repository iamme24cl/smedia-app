import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Rightbar from "./components/Rightbar";
import Add from "./components/Add";
import Login from "./components/Login";
import Logout from "./components/Logout";
import { Box, Stack, createTheme, ThemeProvider, CircularProgress } from "@mui/material";

function App() {
  const [mode, setMode] = useState("light");
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const darkTheme = createTheme({
    palette: {
      mode: mode
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('smedia-token');
    if (token) {
      console.log(token)
      setAuth(true);

      const storedUser = JSON.parse(localStorage.getItem('smedia-user'));
      if (storedUser) {
        setUser(storedUser);
      }
    }
    setLoading(false);
  }, [])

  if (loading) {
    console.log("loading....")
    return (
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} minHeight={"100vh"}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login setAuth={setAuth} setUser={setUser} />}/>
            <Route path="/logout" element={<Logout setAuth={setAuth} />}/>
            <Route 
              path="/"
              element={
                auth ? (
                  <>
                    {console.log("Rendering authenticated routes")}
                    <Navbar user={user} />
                    <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
                      <Sidebar mode={mode} setMode={setMode} />
                      <Feed user={user} />
                      <Rightbar />
                    </Stack>
                    <Add />
                  </>
                ) : (
                  <>
                    {console.log("Navigating to login")}
                    <Navigate to={"/login"} />
                  </>
                )
              }
            />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
