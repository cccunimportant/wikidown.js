var c = console;
var fs = require('fs');
var express = require('express');
var path = require('path');
var bodyParser = require("body-parser"); // 參考：http://codeforgeek.com/2014/09/handle-get-post-request-express-4/
var cookieParser = require('cookie-parser')
var session = require('express-session');
var serveIndex = require('serve-index');
var setting = require('./setting');
var passwords = setting.passwords;

var app = express();
var webDir = path.join(__dirname, 'web');
var dbRoot = path.join(__dirname, 'db');

app.use(cookieParser());
app.use(session({secret: '@#$TYHaadfa1', resave: false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/web/', express.static(webDir));
app.use('/web/', serveIndex(webDir, {'icons': true}));
app.use('/db/', express.static(dbRoot));

function response(res, code, msg) {
  res.set('Content-Length', ''+msg.length).set('Content-Type', 'text/plain').status(code).send(msg).end();
  c.log("response: code="+code+"\n"+msg+"\n");
}

app.get("/", function(req, res) {
  res.redirect('/web/wikidown.html');
});

app.post("/db/:domain/:file", function(req, res) {
  c.log("loginToSave="+setting.loginToSave);
  if (setting.loginToSave === true && req.session.user === undefined) {
   response(res, 500, 'Please login to save!')
   return;
 }
 var domain = req.params.domain;
 var file   = req.params.file;
 var obj    = req.body.obj;
 c.log("domain="+domain+" file="+file);
 fs.writeFile(dbRoot+"/"+domain+"/"+file, obj, function(err) {
  if (err)
    response(res, 500, 'write fail!');
  else
    response(res, 200, 'write success!');
})
});

app.post("/login", function(req, res) {
  var user = req.body.user;
  if (passwords[user] === req.body.password) {
   req.session.user = user;
   response(res, 200, user+":login success!");
 } else {
   response(res, 500, user+":login fail!");
 }
});

app.post("/logout", function(req, res) {
  // req.session.remove('user');
  req.session.destroy();
  response(res, 200, "logout success!");
});


var port = process.env.PORT || 3000; // process.env.PORT for Heroku
app.listen(port);

console.log('Server started: http://localhost:'+port);
