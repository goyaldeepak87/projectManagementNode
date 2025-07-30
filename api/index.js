const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http'); // required for Vercel + Express

const app = express();

// CORS middleware
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'app-environment',
    'device-name',
    'device-id',
    'device-type',
    'ip-address',
    'os-version'
  ]
}));

app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  try {
    await mongoose.connect('mongodb+srv://goyaldeepak871:8jKN5Bks6GLzuHAA@cluster0.w4xlt97.mongodb.net/mydatabaseProject?retryWrites=true&w=majority');
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
  }
};

// Route middleware
app.post('/api/deepak', async (req, res) => {
  await connectDB();
  const { email, name } = req.body;
  res.json({ success: true, data: { email, name } });
});

// Default route
app.get('/api', (req, res) => {
  res.send('✅ API root working');
});

// Export serverless handler
module.exports = serverless(app);
