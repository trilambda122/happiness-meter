
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = require('./app');
const PORT = process.env.PORT || 5443;

const httpOptions = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
};


// uncomment below for HTTPS 
//
// const sslServer = https
//   .createServer(httpOptions, app)
//   .listen(PORT, function () {
//     console.log(
//       `==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`
//     );
//   });

// using http for heroku deployment required.
app.listen(PORT, function () {
  console.log(
    `==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`
  );
});