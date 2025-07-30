const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('../src/routes/v1');

const app = express();

const allowedOrigins = [
  'http://localhost:3001', // your local frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('❌ Not allowed by CORS'));
    }
  },
  credentials: true, // or false if not using cookies or auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// app.options('*', cors()); // Handle preflight

app.use(express.json());

let mongoStatus = '⏳ Connecting...';

const MONGODB_URL = 'mongodb+srv://goyaldeepak871:8jKN5Bks6GLzuHAA@cluster0.w4xlt97.mongodb.net/mydatabaseProject?retryWrites=true&w=majority';

// MongoDB Connection
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  mongoStatus = '✅ Connected';
  console.log('✅ MongoDB connected');
})
.catch((err) => {
  mongoStatus = '❌ Connection Failed';
  console.error('❌ MongoDB connection failed:', err.message);
  mongoStatus = `❌ Connection Failed: ${err.message}`;
});

// Test route — always uses latest mongoStatus
app.get('/', (req, res) => {
  res.send(`
    <h2>🚀 API Status: ✅ Working</h2>
    <h3>🛢️ MongoDB Status: ${mongoStatus}</h3>
  `);
});

app.get('/v1', (req, res) => {
  res.send(`
    <h2>🚀 API Status: ✅ Working</h2>
    <h3>🛢️ MongoDB Status: ${mongoStatus}</h3>
  `);
});

app.get('/v2', (req, res) => {
  res.send(`
    <h2>🚀 API Status: ✅ Working</h2>
  `);
});

app.use('/v3', routes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
