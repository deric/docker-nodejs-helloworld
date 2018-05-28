const express = require('express');

function server()
{
  // Constants
  const DEFAULT_PORT = 8080;
  const PORT = process.env.PORT || DEFAULT_PORT;

  // App
  const app = express();
  app.get('/', (req, res) => {
    res.send('Hello World version 1\n');
  });

  app.listen(PORT, '0.0.0.0');
  console.log(`Running on http://0.0.0.0:${PORT}`);
}
module.export = server;

server()
