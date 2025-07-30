// api/index.js
const serverless = require('serverless-http');
const app = require('../src/app');
const mongoose = require('mongoose');
const config = require('../src/config/config');

let isConnected = false;

async function connectDB() {
  if (!isConnected) {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    isConnected = true;
    console.log('✅ MongoDB connected');
  }
}

module.exports = async (req, res) => {
  await connectDB();
  return serverless(app)(req, res);
};
