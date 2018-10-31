'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

// require and use "multer"...

var app = express();

app.use(cors());
app.use('/', myMiddleware);
app.use('/public', express.static(process.cwd() + '/public'));

function myMiddleware(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

//sample output {"name":"14 repositories obviously.PNG","type":"image/png","size":182201}
app.post('/api/fileanalyse', upload.single('upfile'), function(req, res, next) {
  res.json({file: req.file.originalname, type: req.file.mimetype, size: req.file.size})
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});