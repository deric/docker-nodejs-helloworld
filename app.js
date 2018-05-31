const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World version 1\n');
});

module.exports = app;

