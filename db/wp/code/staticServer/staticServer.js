var express = require('express');
var path = require('path');
var serveIndex = require('serve-index');
var app = express();

var dir = path.join(__dirname, 'public');
app.use('/', express.static(dir));
app.use('/', serveIndex(dir, {'icons': true}));

app.listen(3000);

console.log('dirname='+__dirname+" path="+path.join(__dirname, 'public'));
console.log('Server started: http://localhost:3000/');
 
