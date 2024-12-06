import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, TextField } from '@mui/material';

import TorontoMap from '../static/images/tmap.jpg'; // Background image for the landing page
import i1 from '../static/images/monitor.jpeg'; // Custom start marker
import endMarkerIcon from '../static/images/tmap.jpg'; // Custom end marker
import i2 from '../static/images/analytics.jpeg'; // Custom start marker
import i3 from '../static/images/crowd.jpeg'; 
import i4 from '../static/images/plan.jpg'; 
import logo from '../static/images/logo.svg'; // Import your logo image

const features = [
    { title: 'Real-Time Tracking', description: 'Track cyclists in real-time for enhanced safety and navigation.', image: i1 },
    { title: 'Data Analytics', description: 'Gain insights into cycling patterns and trends for better decision-making.', image: i2 },
    { title: 'Crowdsourcing', description: 'Contribute to and benefit from community-sourced data for improved cycling experiences.', image: i3 },
    { title: 'City Planning', description: 'Utilize data-driven insights to support effective urban planning for cyclists.', image: i4 },
];

const LandingPage = () => {
    const navigate = useNavigate();
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [report, setReport] = useState('');

    const handleGetStarted = () => {
        navigate('/new-app'); // Navigate to the new page
    };

    const handleShowRoute = () => {
        console.log(`Showing route from ${from} to ${to}`);
    };

    const handleReportSubmit = () => {
        console.log(`Report submitted: ${report}`);
        setReport(''); // Clear the report field after submission
    };

    return (
        <div style={{ padding: '20px' }}>
            <AppBar position="static" style={{ backgroundColor: 'rgba(63, 81, 181, 0.8)' }}>
                <Toolbar>
                    <img 
                        src={logo} 
                        alt="Logo" 
                        style={{ height: '50px', marginRight: '20px' }} // Adjust height and margin as needed
                    />
                    <Typography variant="h3">Cyclist Monitoring System</Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl" style={{ position: 'relative', marginTop: '20px' }}>
                <div style={{
                    backgroundImage: `url(${TorontoMap})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1,
                }} />

                <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '40px',
                    borderRadius: '10px',
                    color: 'white',
                    position: 'relative',
                    zIndex: 1,
                }}>
                    <Typography variant="h3" align="center" gutterBottom>
                        Welcome to the Cyclist Monitoring System
                    </Typography>
                    <Typography variant="h5" align="center" paragraph>
                        Our platform empowers cyclists with real-time tracking, safety alerts, and detailed analytics.
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                        <Button variant="contained" color="primary" onClick={handleGetStarted}>
                            Get Started
                        </Button>
                    </div>
                </div>
            </Container>

            <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '40px' }}>
                Features
            </Typography>
            <Grid container spacing={4}>
                {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                            <CardContent>
                                <img 
                                    src={feature.image} 
                                    alt={feature.title} 
                                    style={{ 
                                        width: '100%', 
                                        height: '200px', 
                                        objectFit: 'cover' 
                                    }} 
                                />
                                <Typography variant="h5" component="div">
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '40px' }}>
                Report an Issue
            </Typography>
            <Container maxWidth="md" style={{ marginBottom: '40px' }}>
                <TextField
                    label="From"
                    variant="outlined"
                    fullWidth
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
                <TextField
                    label="To"
                    variant="outlined"
                    fullWidth
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
                <TextField
                    label="Report Issue with Cycle Roads"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={report}
                    onChange={(e) => setReport(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
                <Button variant="contained" color="primary" onClick={handleReportSubmit}>Submit Report</Button>
            </Container>
        </div>
    );
};

export default LandingPage;
