// api/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http');

// MongoDB config
const MONGODB_URL = process.env.MONGODB_URL || 'your-local-mongo-url';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ API is working on Vercel or locally');
});

// let isConnected = false;
let db = null;
async function connectToDatabase() {
  if (!db) {
    db = await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  }
}

const handler = serverless(app);

// Vercel export
module.exports = async (req, res) => {
  await connectToDatabase();
  return handler(req, res);
};

// Local development server
if (require.main === module) {
  (async () => {
    await connectToDatabase();
    app.listen(3000, () => {
      console.log('🚀 Server running on http://localhost:3000');
    });
  })();
}
