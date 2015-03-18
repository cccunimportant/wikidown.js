# Node.js -- Express 路由套件

## 用 node+express 呈現靜態網站

專案下載： @[[staticServer.zip]](code/staticServer.zip)

檔案: staticServer.js

```javascript
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
 

```

檔案: package.json

```javascript
{
  "name": "staticServer",
  "version": "0.0.0",
  "description": "A static server based on express",
  "main": "staticServer.js",
  "dependencies": {
    "serve-index": "",
    "body-parser": "^1.4.3",
    "express": "^4.4.5"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node staticServer.js"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/ccckmit/staticServer.git"
  },
  "keywords": [
    "server",
    "tutorial",
    "example"
  ],
  "author": "ccckmit",
  "bugs": {
    "url": "https://github.com/ccckmit/staticServer/issues"
  },
  "homepage": "https://github.com/staticServer/staticServer"
}
```

## 參考文獻

