const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello\n');
});

app.get('/world', (req, res) => {
  res.send('Hello world\n');
});

app.get('/vodafone', (req, res) => {
  res.send('Hello Vodafone\n');
});

module.exports = app;

