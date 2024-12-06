import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  Box,
  Container,
} from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MapComponent from './components/MapComponent';
import VideoUpload from './components/VideoUpload';

const drawerWidth = 240; // Set the drawer width here

const NavigationDrawer = ({ selectedPage, onLinkClick }) => (
  <Drawer
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        bgcolor: '#10375C', // Background color for the drawer (blue)
        color: 'white', // Text color for links
        padding: '20px', // More padding
        display: 'flex',
        flexDirection: 'column', // Make links stack vertically
      },
    }}
    variant="permanent"
    anchor="left"
  >
    <Toolbar />
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
        Menu
      </Typography>
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          marginBottom: '10px',
          display: 'block',
          backgroundColor: selectedPage === '/' ? '#F3C623' : 'transparent', // Highlight the active link
          padding: '10px',
          borderRadius: '4px', // Rounded corners
        }}
        onClick={() => onLinkClick('/')}
      >
        <Typography
          variant="body1"
          sx={{
            color: selectedPage === '/' ? 'black' : 'white', // Change text color based on selection
          }}
        >
          Map
        </Typography>
      </Link>
      <Link
        to="/upload"
        style={{
          textDecoration: 'none',
          marginBottom: '10px',
          display: 'block',
          backgroundColor: selectedPage === '/upload' ? '#F3C623' : 'transparent', // Highlight the active link
          padding: '10px',
          borderRadius: '4px', // Rounded corners
        }}
        onClick={() => onLinkClick('/upload')}
      >
        <Typography
          variant="body1"
          sx={{
            color: selectedPage === '/upload' ? 'black' : 'white', // Change text color based on selection
          }}
        >
          Surveillance
        </Typography>
      </Link>
    </Box>
  </Drawer>
);

export default function App() {
  const [selectedPage, setSelectedPage] = useState('/'); // Initialize state with default path

  // Handler to set the selected page
  const handleLinkClick = (path) => {
    setSelectedPage(path);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`, // Corrected the syntax here
            ml: `${drawerWidth}px`, // Corrected the syntax here
            bgcolor: '#F3C623', // Change AppBar color to yellow
            boxShadow: 3, // Elevation
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap sx={{ color: 'black' }}>
              Toronto Cycle Path Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <NavigationDrawer selectedPage={selectedPage} onLinkClick={handleLinkClick} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            p: 3,
          }}
        >
          <Toolbar />
          <Container
            maxWidth="lg"
            sx={{
              bgcolor: '#F4F6FF', // Background color for the main content
              borderRadius: 2,
              boxShadow: 2,
              p: 3,
            }}
          >
            <Routes>
              <Route path="/" element={<MapComponent />} />
              <Route path="/upload" element={<VideoUpload />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </Router>
  );
}
