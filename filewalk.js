var fs     = require('fs');
var walk   = require('walk');
var Showdown = require('showdown');
var domain = process.argv[2];
var dir = 'web/db/'+domain+'/wd';
var c = console;
var converter = new Showdown.converter({ extensions: ['table'] });
var template = '<html><head><meta charset="utf-8"><link href="../../../main.css" rel="stylesheet"><title>?title?</title></head><body><div id="content">?wdHtml?</div></body></html>';

function replace(str, source, target) {
  return str.split(source).join(target);
}

function processWd(wdPath) {
  var mdPath = wdPath.replace('/wd/', '/md/');
  var htmPath = wdPath.replace('/wd/', '/htm/')+'.html';
  var wd = fs.readFileSync(wdPath, 'utf8');
  var md  = wd.replace(/(\s)\!\[\[([^\]]*?)\]\]\((.*?)\)/gi, '$1![$2](../img/$3)')
			  .replace(/(\s)\[\[([^\]]+?)\]\]\(([^:\)]+):([^:\)]+)\)/gi,  '$1[$2](../../$3/htm/$4.html)')
			  .replace(/(\s)\[\[([^\]]+?)\]\]\((.*?)\)/gi, '$1[$2](../htm/$3.html)')
			  .replace(/(\s)\[\[([^\]:]+?)\]\]/gi, '$1[$2](../htm/$2.html)')
			  .replace(/(\s)\$\$([^$]+?)\$\$/gi, '$1$[$2]$')
			  ;
  fs.writeFileSync(mdPath, md, 'utf8');
  var wdHtml = converter.makeHtml(md);
  var html = replace(template, '?wdHtml?', wdHtml);
  fs.writeFileSync(htmPath, html, 'utf8');
}

// processWd(dir+'/test');

var walker  = walk.walk(dir, { followLinks: false });

walker.on('file', function(root, stat, next) {
  var path = dir + '/' + stat.name;
  if (path.indexOf('/wd/') >= 0)
	processWd(path);
  next();
});

walker.on('end', function() {
});

