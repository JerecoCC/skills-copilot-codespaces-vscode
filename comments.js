// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/comments', function (req, res) {
  fs.readFile('comments.json', function (err, data) {
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function (err) {
      console.log('Data written to file');
    });
  });
  res.send('Data received:\n' + JSON.stringify(req.body, null, 4));
});

app.get('/comments', function (req, res) {
  fs.readFile('comments.json', function (err, data) {
    res.send(data);
  });
});

app.listen(3000, function () {
  console.log('Server listening on port 3000');
});