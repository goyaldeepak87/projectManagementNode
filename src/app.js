const express = require('express');
const cors = require('cors');
// const userRoutes = require('./routes/v1/user.route');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ API is working on Vercel');
});

// app.use('/v1/users', userRoutes);

module.exports = app;
