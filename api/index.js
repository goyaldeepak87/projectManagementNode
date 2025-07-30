const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('../src/routes/v1');

const app = express();

const allowedOrigins = [
  'http://localhost:3001',
  'https://your-frontend.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'app-environment', 'device-name', 'device-id', 'device-type', 'ip-address', 'os-version'],
}));

// ✅ CORS preflight handling (this line is critical!)
app.options('*', cors());

app.use(express.json());

// MongoDB connection
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect('mongodb+srv://goyaldeepak871:8jKN5Bks6GLzuHAA@cluster0.w4xlt97.mongodb.net/mydatabaseProject?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
}

app.post('/deepak', (req, res) => {
  const { email, name } = req.body;
  res.json({ email, name });
});

app.get('/', async (req, res) => {
  await connectDB();
  res.send('✅ Serverless API working with MongoDB and CORS');
});

module.exports = app;
