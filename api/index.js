const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('../src/routes/v1');
const authController = require('../src/controllers/auth.controller');

const app = express();

// ✅ CORS configuration
const allowedOrigins = [
  'http://localhost:3001', // local dev
  'https://your-frontend.vercel.app', // deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('❌ Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'app-environment', 'device-name', 'device-id', 'device-type', 'ip-address', 'os-version'],
}));

app.use(express.json());

// Your MongoDB connection
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect('mongodb+srv://goyaldeepak871:8jKN5Bks6GLzuHAA@cluster0.w4xlt97.mongodb.net/mydatabaseProject?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
}

app.post('/register', authController.register);

// Root route
app.get('/', async (req, res) => {
  await connectDB();
  res.send('✅ Serverless API working with MongoDB and CORS');
});

// ✅ VERY IMPORTANT: Export app — don’t use app.listen
module.exports = app;
