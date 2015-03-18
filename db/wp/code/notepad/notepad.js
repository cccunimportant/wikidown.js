http = require('http');
qs = require('querystring');
url = require('url');
util = require('util');
var fs = require("fs");

format = function() {
    return util.format.apply(null, arguments);
};

log = console.log;
ip   = "127.0.0.1";
port = 8080;

server = http.createServer(function (req, res) {
  var path = url.parse(req.url, true),
      parameter = qs.parse(path.query);

  formData = '';
  req.on("data", function(data) {
    return formData += data;
  });
  req.on("end", function() {
    res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
    post = qs.parse(formData);
    log(format("post=%j\n", post));
    note  = decodeURIComponent(post.note);
    res.write("path="+post.path+"<br/>");
    res.write("note="+note+"<br/>");
    fs.writeFile(post.path, note, function (err) {
       if (!err) {
         res.write("檔案已儲存!<br/><a href='notepad.htm'>回上一頁！</a>");
	   } else {
         res.write(format("error=%j", err));
	   }
       res.end();
    });	
//  res.end();
  });
});

server.listen(port, ip);

console.log(format("Server (POST test) running at http://%s:%d\n", ip, port));