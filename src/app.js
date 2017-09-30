const express = require('express');
const path = require('path');
const app = express();

// Middleware
// app.use('/assets', express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  // console.log('Request URL:', req.url);
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.get('/:timestamp', function (req, res) {
  let date;
  const { timestamp } = req.params;
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  // if unix timestamp
  if (parseInt(timestamp)) {
    date = new Date(parseInt(timestamp) * 1000);
  } else {
    date = new Date(`${timestamp} 00:00:00Z`);
  }

  const unix = date.getTime() / 1000;
  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const natural = `${month} ${day}, ${year}`;

  res.json({ unix, natural });
});

module.exports = app;
