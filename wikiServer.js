var c = console;
var url = require('url');
var fs = require('fs');
var express = require('express');
var path = require('path');
var bodyParser = require("body-parser"); // 參考：http://codeforgeek.com/2014/09/handle-get-post-request-express-4/
var cookieParser = require('cookie-parser')
var session = require('express-session');
var serveIndex = require('serve-index');
var multer  = require('multer');
var setting = require('./setting');
var passwords = setting.passwords;

var app = express();
var webDir = path.join(__dirname, 'web');
var dbRoot = path.join(__dirname, 'db');

function isLogin(req) {
  return typeof(req.session.user)!=='undefined';
}

app.use(cookieParser());
app.use(session({secret: '@#$TYHaadfa1', resave: false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/web/', express.static(webDir));
app.use('/web/', serveIndex(webDir, {'icons': true}));
app.use('/db/', express.static(dbRoot));

app.use(multer({
  dest: './db/',
  onFileUploadStart: function (file, req, res) {
    if (!isLogin(req)) return false;
	return true;
  },
  rename: function (fieldname, filename, req, res) {
	domain = req.url.match(/\/([^\/]+)$/)[1];
    return domain+'/'+filename.replace(/\W+/g, '-').toLowerCase();
  },
  onParseEnd: function (req, next) {
    next();
  }, 
  onFileUploadStart: function (file) {
  },
  onFileUploadComplete: function (file) {
    done=true;
  }  
}));

function response(res, code, msg) {
  res.set('Content-Length', ''+msg.length).set('Content-Type', 'text/plain').status(code).send(msg).end();
  c.log("response: code="+code+"\n"+msg+"\n");
}

app.post('/upload/:domain', function(req, res){
  if (!isLogin(req)) response(res, 500, '{}');
  if(done==true){
	c.log('======upload==========');
	c.log('req.body=%j', req.body);
	c.log('req.files=%j', req.files);
	response(res, 200, '{}');
	// 傳回給 krajee bootstrap file-input 的訊息，必須是一個 JSON 格式的物件
	// 請參考： http://webtips.krajee.com/ajax-based-file-uploads-using-fileinput-plugin/
  }
 }
);

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
  req.session.destroy();
  response(res, 200, "logout success!");
});

var port = process.env.PORT || 3000; // process.env.PORT for Heroku
app.listen(port);

console.log('Server started: http://localhost:'+port);
