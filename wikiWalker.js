var fs     = require('fs');
var walk   = require('walk');
var Showdown = require('showdown');
var converter = new Showdown.converter({ extensions: ['table'] });
var config = require('./web/config');
var c = console;

function writeFile(path, text) {
    var parts = path.split('/');
    for( var i = 1; i < parts.length; i++ ) {
	  var partPath = parts.slice(0, i).join('/');
	  try {
        fs.mkdirSync(partPath);
	  } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
      }
    }
	fs.writeFileSync(path, text, 'utf8');
}

function replace(str, source, target) {
  return str.split(source).join(target);
}

function wd2md(wd) {
  var md  = wd.replace(/(\s)\!\[\[([^\]]*?)\]\]\((.*?)\)/gi, '$1![$2](../img/$3)')
			  .replace(/(\s)\[\[([^\]]+?)\]\]\(([^:\)]+):([^:\)]+)\)/gi,  '$1[$2](../../$3/htm/$4.html)')
			  .replace(/(\s)\[\[([^\]]+?)\]\]\((.*?)\)/gi, '$1[$2](../htm/$3.html)')
			  .replace(/(\s)\[\[([^\]:]+?)\]\]/gi, '$1[$2](../htm/$2.html)')
			  .replace(/(\s)\$\$([^$]+?)\$\$/gi, '$1$[$2]$')
			  ;
  return md;
}

function wd2html(wd) {
  var md  = wd2md(wd);
  return converter.makeHtml(md);
}

function bookTitleHtml(domain) {
  var titleHead = title['wikidown'];
  if (title[domain] !== undefined)
    titleHead = title[domain];
  c.log(titleHead);
  return wd2html(titleHead);
}

function processWd(wdPath, template) {
  var domain = wdPath.match(/\/([^\/]+)\/wd\//)[1];
  c.log('path='+wdPath+' domain='+domain);
  var mdPath = wdPath.replace('/wd/', '/md/');
  var htmPath = wdPath.replace('/wd/', '/htm/')+'.html';
  var wd = fs.readFileSync(wdPath, 'utf8');
  var md  = wd2md(wd);
  writeFile(mdPath, md);
  var wdHtml = converter.makeHtml(md);
  var html = replace(template, '?wdHtml?', wdHtml);
  html = replace(html, '?bookTitle?', bookTitleHtml(domain));
  var titleMatch = wd.match(/([^#\n]{1,100})/);
  c.log('titleMatch='+titleMatch);
  var pageTitle = '';
  if (titleMatch !== null) pageTitle = titleMatch[1];
  c.log('pageTitle='+pageTitle);
  html = replace(html, '?pageTitle?', pageTitle);
  writeFile(htmPath, html);
}

// c.log(config);

var template = '<html><head><meta charset="utf-8"><link href="../../../static.css" rel="stylesheet"><title>?pageTitle?</title></head><body><div id="header_wrap"><h1>?bookTitle?</h1></div><div id="content">?wdHtml?</div></body></html>';

var dir;

if (process.argv.length > 2) {
  var domain = process.argv[2];
  dir = 'web/db/'+domain+'/wd';
} else
  dir = 'web/db';

var title = config.title;
var walker  = walk.walk(dir, { followLinks: true });

walker.on('file', function(dir, stat, next) {
  var path = dir + '/' + stat.name;
  path = replace(path, '\\', '/');
  if (path.indexOf('/wd/') >= 0) {
	processWd(path, template);
  }
  next();
});

walker.on('end', function() {
});

