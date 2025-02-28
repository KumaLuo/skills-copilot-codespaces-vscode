// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

// Set the static files folder
app.use(express.static(path.join(__dirname, 'public')));

// Use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a route for the comments
app.get('/comments', function(req, res){
  fs.readFile('comments.json', function(err, data){
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/comments', function(req, res){
  fs.readFile('comments.json', function(err, data){
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err){
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(comments));
    });
  });
});

// Start the server
app.listen(3000);
console.log('Server started: http://localhost:3000/');