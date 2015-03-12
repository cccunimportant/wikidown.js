var path = require('path');
var fs = require("fs");
var qs = require('querystring');
var express = require("express");
var app = express();	
app.listen(80);
var c = console;

var response = function(res, type, text) {
	res.writeHead(200, {'Content-Type': type});
	res.write(text);
	console.log(text);
	res.end();
}

app.get('*', function(req, res){
  try {
	var path = '.' + req.url;
    c.log('path='+path);
  } catch (err) {
	response(res, "text/plain", err.toString());
  }
});

console.log('start WebServer\n');