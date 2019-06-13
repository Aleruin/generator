var express = require('express');
var app = express();
var fs = require('fs');

app.use(express.static(__dirname + '/'));

app.use(express.json());

app.post('/server.js', function(req, res){
  console.log(req.body);
  fs.writeFile('answer.json', JSON.stringify(req.body), 'utf-8', function(err, data) {});
});

app.listen(8080);

console.log('Server running on port 8080');






