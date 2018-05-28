let express = require('express');

// Constants
const DEFAULT_PORT = 8080;
let PORT = process.env.PORT || DEFAULT_PORT;

// App
let app = express();
app.get('/', function (req, res) {
  res.send('Hello World version 1\n');
});

app.listen(PORT, "0.0.0.0")
console.log('Running on http://0.0.0.0:' + PORT);
