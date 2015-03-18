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
  var path = url.parse(req.url),
      parameter = qs.parse(path.query);

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(format("path=%j\n", path));
  res.write(format("parameter=%j\n", parameter));
  res.end();
});

server.listen(port, ip);

console.log(format("Server running at http://%s:%d\n", ip, port));