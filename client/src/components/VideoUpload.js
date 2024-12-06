import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

export default function VideoUpload() {
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [processedVideoUrl, setProcessedVideoUrl] = useState('/videos/processed_video1a.mp4'); // Static path

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('video', video);

    setLoading(true); // Start loading
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
      setProcessedVideoUrl('/videos/processed_video1a.mp4'); // Update with processed video path if needed
    } catch (error) {
      console.error('Upload Error:', error);
      if (error.response) {
        setMessage('Error: ' + error.response.data.message);
      } else {
        setMessage('Error processing video: ' + error.message);
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Upload Video for Detection</Typography>
      <input type="file" accept="video/*" onChange={handleVideoChange} />
      <Button variant="contained" color="primary" onClick={handleUpload} disabled={!video || loading}>
        Upload Video
      </Button>
      {message && <Typography variant="body1">{message}</Typography>}
      
      {loading && (
        <Box mt={2} display="flex" alignItems="center">
          <CircularProgress size={24} />
          <Typography variant="body1" ml={1}>Processing...</Typography>
        </Box>
      )}
      
      {!loading && processedVideoUrl && (
        <Box mt={2}>
          <Typography variant="h6">Processed Video:</Typography>
          <Button variant="contained" href={processedVideoUrl} download>
            Download Processed Video
          </Button>
        </Box>
      )}
    </Box>
  );
}
