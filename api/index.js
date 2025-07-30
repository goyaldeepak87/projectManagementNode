const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// CORS setup
app.use(cors({
  origin: 'http://localhost:3001', // or your frontend
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

// MongoDB connection (works in Vercel functions)
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return; // already connected
  try {
    await mongoose.connect('mongodb+srv://goyaldeepak871:8jKN5Bks6GLzuHAA@cluster0.w4xlt97.mongodb.net/mydatabaseProject?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  }
};

// Main handler (Vercel requires a single export)
module.exports = async (req, res) => {
  await connectDB(); // Ensure MongoDB is connected

  if (req.method === 'OPTIONS') {
    return res.status(200).send('Preflight OK');
  }

  if (req.url === '/deepak' && req.method === 'POST') {
    const { email, name } = req.body;
    return res.json({
      message: '✅ Data received successfully',
      data: { email, name },
      headers: req.headers,
    });
  }

  // Default response
  res.status(200).send('✅ Serverless Express API running!');
};
