var fs     = require('fs');
var Showdown = require('showdown');
var converter = new Showdown.converter({ extensions: ['table'] });
// var markdown = require('markdown').markdown;
var config = require('./web/config');
var c = console;

var title = config.title;
var template = '<html><head><meta charset="utf-8"><link href="../static.css" rel="stylesheet"><title><%=pageTitle%></title></head><body><header><%=bookTitle%></header><main><article><%=wdHtml%></article></main></body></html>';

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
  var templateHead = config.template['default'];
  if (config.template[domain] !== undefined)
    templateHead = config.template[domain];
  return templateHead;
}

function bookTitle(domain) {
  var titleHead = title['default'];
  if (title[domain] !== undefined)
    titleHead = title[domain];
  return titleHead;
}

function wd2page(wd, domain) {
  var md  = wd2md(wd, domain);
  var md1 = replace(bookTemplate(domain), '<%=wd%>', md);
  var wdHtml = md2html(md1);
  var html = replace(template, '<%=wdHtml%>', wdHtml);
  var titleMd = bookTitle(domain);
  var titleHtml = wd2html(' [[<<]](main:home) '+titleMd, domain);
  html = replace(html, '<%=bookTitle%>', titleHtml);
  var titleMatch = wd.match(/([^#\n]{1,100})/);
  var pageTitle = titleMd;
  if (titleMatch !== null) pageTitle += ' / '+titleMatch[1];
  pageTitle = pageTitle.replace(/(\s)\[\[([^\]]+?)\]\]\(([^:\)]+):([^:\)]+)\)/gi,'$2').replace(/[\s]/gi, '');
  c.log('pageTitle='+pageTitle);
  html = replace(html, '<%=pageTitle%>', pageTitle);
  return html;
}

function processWd(wdFile, wdPath) {
  wdPath = wdPath.replace('\\', '/');
  var domain = wdPath.match(/\/([^\/]+)$/)[1];
  var wd = fs.readFileSync(wdPath+'/'+wdFile, 'utf8');
  // 轉換 wd 為 md 後存檔
  var md  = wd2md(wd, domain);
  var mdFile = wdFile.replace(/\.wd$/, '.md');
  writeFile(wdPath+'/'+mdFile, md);  
  // 轉換 wd 為 html 後存檔
  var html = wd2page(wd, domain);
  var htmFile = wdFile.replace(/\.wd$/, '.html');
  writeFile(wdPath+'/'+htmFile, html);
}

// c.log(config);

module.exports = { processWd:processWd };