var fs     = require('fs');
var walk   = require('walk');
var Showdown = require('showdown');
var converter = new Showdown.converter({ extensions: ['table'] });
// var markdown = require('markdown').markdown;
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

function wd2md(wd, domain) {
  var md = wd.replace(/(\s)\!\[\[([^\]]*?)\]\]\((.*?)\)/gi, '$1![$2]($3)')
       .replace(/(\s)\[\[([^\]]+?)\]\]\(([^:\)]+):([^:\)]+)\)/gi,  '$1[$2](../$3/$4.html)')
       .replace(/(\s)\[\[([^\]]+?)\]\]\((.*?)\)/gi, '$1[$2]($3.html)')
       .replace(/(\s)\[\[([^\]:]+?)\]\]/gi, '$1[$2]($2.html)');
// .replace(/(\s)\$\$([^$]+?)\$\$/gi, '$1$[$2]$')
  return md;
}

function md2html(md) {
//  return markdown.toHTML(md, 'Maruku');
  return converter.makeHtml(md);
}

function wd2html(wd, domain) {
  var md  = wd2md(wd, domain);
  return md2html(md);
}

function bookTemplate(domain) {
  var templateHead = config.template['wikidown'];
  if (config.template[domain] !== undefined)
    templateHead = config.template[domain];
  return templateHead;
}

function bookTitleHtml(domain) {
  var titleHead = title['wikidown'];
  if (title[domain] !== undefined)
    titleHead = title[domain];
  c.log(titleHead);
  return wd2html(' [[<<]](main:home) '+titleHead, domain);
}

function processWd(wdFile, wdPath, template) {
  wdPath = wdPath.replace('\\', '/');
  var domain = wdPath.match(/\/([^\/]+)$/)[1];
  var wd = fs.readFileSync(wdPath+'/'+wdFile, 'utf8');
  var md  = wd2md(wd, domain);
  var mdFile = wdFile.replace(/\.wd$/, '.md');
  var htmFile = wdFile.replace(/\.wd$/, '.html');
  c.log('file='+wdFile+' path='+wdPath+' domain='+domain+' mdFile='+mdFile+' htmFile='+htmFile);
  writeFile(wdPath+'/'+mdFile, md);
  var md1 = replace(bookTemplate(domain), '%wd%', md);
//  var wdHtml = converter.makeHtml(md1); // showdown.js
  var wdHtml = md2html(md1);
  var html = replace(template, '?wdHtml?', wdHtml);
  html = replace(html, '?bookTitle?', bookTitleHtml(domain));
  var titleMatch = wd.match(/([^#\n]{1,100})/);
  c.log('titleMatch='+titleMatch);
  var pageTitle = '';
  if (titleMatch !== null) pageTitle = titleMatch[1];
  c.log('pageTitle='+pageTitle);
  html = replace(html, '?pageTitle?', pageTitle);
  writeFile(wdPath+'/'+htmFile, html);
}

// c.log(config);

var template = '<html><head><meta charset="utf-8"><link href="../static.css" rel="stylesheet"><title>?pageTitle?</title></head><body><header>?bookTitle?</header><main><article>?wdHtml?</article></main></body></html>';

var dir;

if (process.argv.length > 2) {
  var domain = process.argv[2];
  dir = 'db/'+domain+'/wd';
} else
  dir = 'db';

var title = config.title;
var walker  = walk.walk(dir, { followLinks: true });

walker.on('file', function(dir, stat, next) {
  var file = stat.name;
//  path = replace(path, '\\', '/');
  if (file.indexOf('.wd') >= 0 && file.indexOf('*') < 0) {
    c.log('file='+file+' dir='+dir);
    processWd(file, dir, template);
  }
  next();
});

walker.on('end', function() {
});

