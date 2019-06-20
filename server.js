var express = require('express');
var app = express();
var fs = require('fs');
var ns = require('./js/modules/name-saver');
var answer = []; 

app.use(express.static(__dirname + '/'));

app.use(express.json());

app.get('/server.js', function(req, res){
  answer.push(req.body);
  console.log(answer);
})

app.post('/server.js', function(req, res){
  let studentData = req.body.student;
  let abbr = ns.getAbbr(studentData); 
  
  fs.writeFile(ns.transliterate(abbr) + '.json', JSON.stringify(req.body), 'utf-8', function(err, data) {});
});

app.listen(8080);

console.log('Server running on port 8080');






