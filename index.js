var express = require('express');

// Constants
var DEFAULT_PORT = 8080;
var PORT = process.env.PORT || DEFAULT_PORT;

// App
var app = express();
app.get('/', function (req, res) {
  res.send('Hello World\n');
});

app.listen(PORT,"0.0.0.0")
console.log('Running on http://0.0.0.0:' + PORT);
