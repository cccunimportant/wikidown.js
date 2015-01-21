var c = console;
var fs = require('fs');
var express = require('express');
var path = require('path');
var bodyParser = require("body-parser"); // 參考：http://codeforgeek.com/2014/09/handle-get-post-request-express-4/
var cookieParser = require('cookie-parser')
var session = require('express-session');
var serveIndex = require('serve-index');

var app = express();
var webDir = path.join(__dirname, 'web');
var dbDir = webDir;

app.use(cookieParser());
app.use(session({secret: '@#$TYHaadfa1', resave: false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/web/', express.static(webDir));
app.use('/web/', serveIndex(webDir, {'icons': true}));

function response(res, code, msg) {
  res.set('Content-Length', ''+msg.length).set('Content-Type', 'text/plain').status(code).send(msg).end();
  c.log("response: code="+code+"\n");
}

app.get("/", function(req, res) {
  res.redirect('/web/wikidown.html');
});

app.get("/db/:db/:name", function(req, res) {
  var db = req.params.db;
  var name = req.params.name;
  fs.readFile(dbDir+'/'+db+'/'+name, function(err, jtext) {
    if (err)
      response(res, 404, 'read fail!');
    else
      response(res, 200, jtext.toString());
  });
});

app.post("/db/:db/:name", function(req, res) {
  var db = req.params.db;
  var name = req.params.name;
  var obj = req.body.obj;
  var msg = "db:"+db+" name:"+name+"\n"+obj;
  c.log(msg);
  fs.writeFile(dbDir+"/"+db+"/"+name, obj, function(err) {
    if (err)
      response(res, 500, 'write fail!');
    else
      response(res, 200, 'write success!');
  })
});

var port = process.env.PORT || 3000; // process.env.PORT for Heroku
app.listen(port);

console.log('Server started: http://localhost:'+port);
