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
var dbRoot = path.join(webDir, 'db');

app.use(cookieParser());
app.use(session({secret: '@#$TYHaadfa1', resave: false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/web/', express.static(webDir));
app.use('/web/', serveIndex(webDir, {'icons': true}));

function response(res, code, msg) {
  res.set('Content-Length', ''+msg.length).set('Content-Type', 'text/plain').status(code).send(msg).end();
  c.log("response: code="+code+"\n"+msg+"\n");
}

app.get("/", function(req, res) {
  res.redirect('/web/wikidown.html');
});

/*
app.get("/db/:db/:name", function(req, res) {
  var db = req.params.db;
  var name = req.params.name;
  fs.readFile(dbRoot+'/'+db+'/'+name, function(err, jtext) {
    if (err)
      response(res, 404, 'read fail!');
    else
      response(res, 200, jtext.toString());
  });
});
*/

app.post("/db/:db/:name", function(req, res) {
  c.log("loginToSave="+setting.loginToSave);
  if (setting.loginToSave === true && req.session.user === undefined) {
	  response(res, 500, 'Please login to save!')
	  return;
  }
  var db = req.params.db;
  var name = req.params.name;
  var obj = req.body.obj;
  fs.writeFile(dbRoot+"/"+db+"/md/"+name, obj, function(err) {
    if (err)
      response(res, 500, 'write fail!');
    //else
    //  response(res, 200, 'write success!');
  })
  c.log("alright, there is need a response.");
  c.log("again, try to write a file with some meta which can be parsed by FB graph api.");
  //var metafs = require('fs');
  var ogTitle = obj.split('\n')[0].split('# ')[1];
  c.log("===DEBUG===");
  c.log(ogTitle);
  c.log("===DEBUG===");
  var ogstr = '\
<html>\n\
  <head>\n\
    <meta charset="utf-8" />\n\
    <link rel="icon" href="favicon.ico">\n\
    <meta property="description" />\n\
    <meta property="og:site_name" content="wikidown" />\n\
    <meta property="og:title" content="' + ogTitle + '" />\n\
    <meta property="og:type" content="article" />\n\
  </head>\n\
  <body>\n\
    <script>window.location.replace("/web/wikidown.html#' + db + ':' + name + '");</script>\n\
  </body>\n\
</html>';
  fs.writeFile(dbRoot+"/"+db+"/link/"+name+".html", ogstr, function(e) {
    if (e) response(res, 500, "test fail!");
    else response(res, 200, "test success^_^");
  })
  //response(res, 200, 'write success!');
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
