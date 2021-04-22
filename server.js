const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

app.listen(PORT, function () {
  console.log(
    `==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`
  );
});
