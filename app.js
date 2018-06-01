const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World Gary\n');
});

module.exports = app;

