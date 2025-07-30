const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

let mongoStatus = '';

// MongoDB Connection
mongoose.connect('mongodb+srv://goyaldeepak871:8jKN5Bks6GLzuHAA@cluster0.w4xlt97.mongodb.net/mydatabaseProject?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
   mongoStatus = '✅ Connected';
  console.log('✅ Connected to MongoDB');
})
.catch((err) => {
  mongoStatus = '❌ Connection Failed';
  console.error('❌ MongoDB connection failed:', err.message);
});

// Test Route
app.get('/', (req, res) => {
   res.send(`API Status: ✅ Working <br> MongoDB: ${mongoStatus}`);
});

// app.use('/v1/users', userRoutes);

// Start Server
const PORT = 8000 || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
