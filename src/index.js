const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('1 API is working');
});

app.get('/dd', (req, res) => {
  res.send('check API is working');
});

module.exports = app;
