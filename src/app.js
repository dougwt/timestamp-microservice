const express = require('express');
const path = require('path');
const app = express();

// Middleware
// app.use('/assets', express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  console.log('Request URL:', req.url);
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/public/index.html');
// });

// app.get('/:timestamp', function (req, res) {
//   // TODO: Parse timestamp as Unix timestamp or Date.
// });

module.exports = app;
