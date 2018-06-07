const app = require('./app.js');

const PORT = 8080;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Running on http://0.0.0.0:${PORT}`); // eslint-disable-line no-console
});

