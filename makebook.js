'use strict';
var c = console;
var fs = require("fs");
var domain = process.argv[2];
var path = 'db/'+domain;
var bookFile = path+'/book.top';
var bookText = fs.readFileSync(bookFile, 'utf8');
var outText = '';
var lines = bookText.split('\n');
for (var i in lines) {
  c.log('line='+lines[i]);
  var tokens = lines[i].split(':')
  var head = tokens[0].trim();
  if (head === 'file') {
    var mdFile = tokens[1].trim()+'.md';
    c.log('mdFile='+mdFile);
    var mdText = fs.readFileSync(path+'/'+mdFile, 'utf8');
    outText += mdText+'\n';
  } else {
    outText += lines[i]+'\n';
  }
}
c.log(outText);
fs.writeFileSync(path+'/book.md', outText);
