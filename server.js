var express = require('express');
var fs = require('fs');
var ns = require('./js/modules/name-saver');
var app = express();
var studentFilesCatalog = './students/';

app.use(express.static(__dirname + '/'));

app.use(express.json());

//открытие главной формы по URL 127.0.0.1:8080/
app.get('/', function(req, res){ 
  res.sendFile(__dirname + '/main.html');
})

//открытие формы регистрации по URL 127.0.0.1:8080/registration
app.get('/registration', function(req, res){ 
  res.sendFile(__dirname + '/registration.html');
})

//открытие формы регистрации по URL 127.0.0.1:8080/registration
app.get('/task', function(req, res){ 
  res.sendFile(__dirname + '/task.html');
})

//открытие формы регистрации по URL 127.0.0.1:8080/registration
app.get('/teacher', function(req, res){ 
  res.sendFile(__dirname + '/teacher.html');
})

//сохранение файла на сервере
app.post('/answer', function(req, res){ 
  let studentData = req.body.student;
  let abbr = ns.getAbbr(studentData); 
  console.log(abbr);  

  fs.writeFile(ns.transliterate(abbr) + '.json', JSON.stringify(req.body), 'utf-8', function(err, data) {});
});

//поиск файла в каталоге на сервере и передача его данных в качестве ответа на запрос
app.post('/data', function(req, res){ 
  let data = req.body;
  let abbr = "";
  
  Object.keys(data).forEach(function(prop){
    abbr += data[prop].charAt(0).toLowerCase();
  });
  
  fs.readdir(studentFilesCatalog, function(err, files){
    files.forEach(function (file){
      if (file.substr(0,4) === ns.transliterate(abbr)) {
        console.log('Все работает');
        res.sendFile(__dirname + '/students/' + file);
      }
    });
  });
});

app.listen(8080);

console.log('Server running on port 8080');

