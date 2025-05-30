// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const http = require('http');
const cors = require('cors');
const githubRoutes = require('./routes/github.routes');

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Basic health check endpoint
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Test endpoint to check if GitHub token is configured
app.get('/test-token', (req, res) => {
  if (process.env.GITHUB_TOKEN) {
    res.json({ 
      status: 'success', 
      message: 'GitHub token is configured',
      tokenLength: process.env.GITHUB_TOKEN.length 
    });
  } else {
    res.status(500).json({ 
      status: 'error', 
      message: 'GitHub token is not configured' 
    });
  }
});

// Mount GitHub-related routes under /api/github
app.use('/api/github', githubRoutes);

// Export app and server for use in other files (e.g., for starting the server)
module.exports = { app, server };