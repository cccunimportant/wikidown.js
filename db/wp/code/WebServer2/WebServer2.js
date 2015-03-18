var path = require('path');
var fs = require("fs");
var qs = require('querystring');
var express = require("express");
var app = express();

var mimeType = {
   "jpg":"image/jpeg", 
   "gif":"image/gif", 
   "png":"image/png", 
   "svg":"image/svg",
   "zip":"application/zip", 
   "pdf":"application/pdf", 
   "xls":"application/vnd.ms-excel", 
   "ppt":"application/vnd.ms-powerpoint", 
   "doc":"application/msword", 
   "htm":"text/html", 
   "html":"text/html"
};

function getMimeType(ext) {
	var type = mimeType[ext];
	if (!type)
		return "text/plain";
	else
		return type;
}

app.listen(80);

var response = function(res, type, data) {
	res.writeHead(200, {'Content-Type': type});
	if (type.indexOf("text/")>=0)
		res.end(data);
	else
		res.end(data, "binary");
}

app.get('*', function(req, res){
  try {
	var path = '.' + req.url;
	fs.stat(path, function(err, pathStat) {
		if (err) {
			response(res, "text/plain", err.toString());
			return;
		}
		if (pathStat.isFile()) {
			fs.readFile(path, function(err, file) {
				var tokens = path.split(".");
				var ext = tokens[tokens.length-1];
				response(res, getMimeType(ext), file);
			});
		} else if (pathStat.isDirectory()) {
			var dirPath = req.url;
			if (dirPath.substring(-1)!=="/") 
				dirPath = dirPath+"/";
			var html = "<html><body><h1>"+req.url+"</h1>\n";
			fs.readdir(path, function(err, files) {
				for (f in files) {
					fname = files[f];
					filePath = dirPath+fname;
					html += "<li><a href='"+filePath+"'>"+fname+"</a></li>\n";
				}
				html += "<body></html>";
				response(res, "text/html", html);
			});
		} 
	});	
  } catch (err) {
	response(res, "text/plain", err.toString());
  }
});

console.log('start WebServer\n');