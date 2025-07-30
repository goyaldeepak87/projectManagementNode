// api/index.js
const express = require('express');
const mongoose = require('mongoose');
const routes = require('../src/routes/v1');

const app = express();

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect('mongodb+srv://goyaldeepak871:8jKN5Bks6GLzuHAA@cluster0.w4xlt97.mongodb.net/mydatabaseProject?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
}

app.use(express.json());
app.use('/v3', routes);

app.get('/', async (req, res) => {
  await connectDB();
  res.send('✅ Serverless API Working & MongoDB Connected');
});

module.exports = app;
