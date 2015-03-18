http = require('http');
qs = require('querystring');
url = require('url');
util = require('util');

format = function() {
    return util.format.apply(null, arguments);
};

log = console.log;
ip   = "127.0.0.1";
port = 8080;

server = http.createServer(function (req, res) {
  var path = url.parse(req.url, true),
      parameter = qs.parse(path.query);

  res.writeHead(200, {'Content-Type': 'text/plain'});
  formData = '';
  req.on("data", function(data) {
    return formData += data;
  });
  req.on("end", function() {
    res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
    post = qs.parse(formData);
    log(format("post=%j\n", post));
    user = post.user;
    password = post.password;
    title = decodeURIComponent(post.title);
    text  = decodeURIComponent(post.text);
    res.write("user="+user+"<br/>");
    res.write("password="+password+"<br/>");
    res.write("title="+title+"<br/>");
    res.write("text="+text+"<br/>");
    res.end();
  });
});

server.listen(port, ip);

console.log(format("Server (POST test) running at http://%s:%d\n", ip, port));
