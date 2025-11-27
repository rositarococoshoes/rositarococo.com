const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'minimal.astro'));
});

app.get('/gracias/1par', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'gracias', '1par.astro'));
});

app.get('/gracias/2pares', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'gracias', '2pares.astro'));
});

// Serve static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'minimal.astro'));
});

app.listen(PORT, () => {
  console.log(`🚀 Simple server running at http://localhost:${PORT}`);
  console.log('📝 Serving minimal.astro as test');
});
