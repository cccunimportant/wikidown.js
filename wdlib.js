var wdlib = (function() {
  var fs     = require('fs');
  var Showdown = require('showdown');
  var converter = new Showdown.converter({ extensions: ['table'] });
  var config = require('./web/config');
	var jslib  = require('./jslib');
  var c      = console;

//  var title = config.title;
  var templateHtml = '<html><head><meta charset="utf-8"><link href="../static.css" rel="stylesheet"><title><%=pageTitle%></title></head><body><header><%=bookTitle%></header><main><article><%=wdHtml%></article></main></body></html>';

  function wd2md(wd, domain) {
    var md = wd.replace(/(\s)\!\[\[([^\]]*?)\]\]\((.*?)\)/gi, '$1![$2]($3)')
       .replace(/(\s)\[\[([^\]]+?)\]\]\(([^:\)]+):([^:\)]+)\)/gi,  '$1[$2](../$3/$4.html)')
       .replace(/(\s)\[\[([^\]]+?)\]\]\((.*?)\)/gi, '$1[$2]($3.html)')
       .replace(/(\s)\[\[([^\]:]+?)\]\]/gi, '$1[$2]($2.html)');
  // .replace(/(\s)\$\$([^$]+?)\$\$/gi, '$1$[$2]$')
    return md;
  }

  function md2html(md) {
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
    var titleHead = config.title['default'];
    if (config.title[domain] !== undefined)
    titleHead = config.title[domain];
    return titleHead;
  }

  function toHtml(wd, domain) {
    var md  = wd2md(wd, domain);
    var md1 = jslib.replace(bookTemplate(domain), '<%=wd%>', md);
    var wdHtml = md2html(md1);
    var html = jslib.replace(templateHtml, '<%=wdHtml%>', wdHtml);
    var titleMd = bookTitle(domain);
    var titleHtml = wd2html(' [[<<]](main:home) '+titleMd, domain);
    html = jslib.replace(html, '<%=bookTitle%>', titleHtml);
    var titleMatch = wd.match(/([^#\n]{1,100})/);
    var pageTitle = titleMd;
    if (titleMatch !== null) pageTitle += ' / '+titleMatch[1];
    pageTitle = pageTitle.replace(/(\s)\[\[([^\]]+?)\]\]\(([^:\)]+):([^:\)]+)\)/gi,'$2').replace(/[\s]/gi, '');
    c.log('pageTitle='+pageTitle);
    html = jslib.replace(html, '<%=pageTitle%>', pageTitle);
    return html;
  }

  function toHtmlFile(wdFile, wdPath) {
    wdPath = wdPath.replace('\\', '/');
    var domain = wdPath.match(/\/([^\/]+)$/)[1];
    var wd = fs.readFileSync(wdPath+'/'+wdFile, 'utf8');
    // 轉換 wd 為 md 後存檔
    var md  = wd2md(wd, domain);
    var mdFile = wdFile.replace(/\.wd$/, '.md');
    fs.writeFileSync(wdPath+'/'+mdFile, md, 'utf8');  
    // 轉換 wd 為 html 後存檔
    var html = toHtml(wd, domain);
    var htmFile = wdFile.replace(/\.wd$/, '.html');
    fs.writeFileSync(wdPath+'/'+htmFile, html, 'utf8');
  }

  return {
		toHtml:toHtml,
    toHtmlFile:toHtmlFile
  }
})();

if (typeof module !== 'undefined') 
	module.exports = wdlib;