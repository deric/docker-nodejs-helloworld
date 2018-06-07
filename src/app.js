const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello\n');
});

app.get('/world', (req, res) => {
  res.send('Hello world\n');
});

module.exports = app;

