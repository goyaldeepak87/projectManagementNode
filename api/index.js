const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http');

const MONGODB_URL = process.env.MONGODB_URL;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ API is working on Vercel');
});

// MongoDB lazy connection (runs only once per cold start)
let isConnected = false;

async function connectToDatabase() {
  if (!isConnected) {
    await mongoose.connect('mongodb+srv://goyaldeepak871:8jKN5Bks6GLzuHAA@cluster0.w4xlt97.mongodb.net/mydatabaseProject?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ MongoDB connected");
  }
}

const handler = serverless(app);

// This is the only thing Vercel will run
module.exports = async (req, res) => {
  await connectToDatabase();
  return handler(req, res);
};
