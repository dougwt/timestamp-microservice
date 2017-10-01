const express = require('express');
const path = require('path');
const moment = require('moment');
const app = express();

// Middleware
// app.use('/assets', express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  // console.log('Request URL:', req.url);
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.get('/:query', function (req, res) {
  const { query } = req.params;
  let date;
  if (parseInt(query)) {
    date = moment.utc(parseInt(query), 'X');
  } else {
    date = moment.utc(query, 'MMMM DD, YYYY');
  }

  if (!date.isValid()) {
    res.json({ unix: null , natural: null });
    return;
  }

  res.json({
    unix: parseInt(date.format('X')),
    natural: date.format('MMMM D, Y')
  });
});

module.exports = app;
