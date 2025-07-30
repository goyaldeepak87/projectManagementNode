// api/index.js
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const app = require('../src/app');
const config = require('../src/config/config');

let isConnected = false;

async function connectToDatabase() {
  if (!isConnected) {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    isConnected = true;
    console.log("✅ MongoDB connected");
  }
}

// This is how Vercel handles serverless Express
const handler = serverless(app);

module.exports = async (req, res) => {
  await connectToDatabase();
  return handler(req, res);
};
