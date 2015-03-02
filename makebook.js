'use strict';
var c = console;
var fs = require("fs");
var domain = process.argv[2];
var path = 'web/db/'+domain+'/wd/';
var dirFile = path+'directory';
var dirText = fs.readFileSync(dirFile, 'utf8');
c.log("dirText:\n"+dirText);
var linkExp = /(\s)\[\[([^\]]+?)\]\]\((.*?)\)/g;
var match;
while (match = linkExp.exec(dirText)) {
  var title=match[2], file=match[3];
  c.log("title="+title+" file="+file);
}
/*
c.log("innerMatches:\n"+matches);
for (var i in matches) {
  var match = matches[i];
  c.log(match[1]);
}
*/
/*

  md  = md.replace(/(\s)\!\[\[([^\]]*?)\]\]\((.*?)\)/gi, '$1<div class="figure"><img src="db/'+path().domain+'/img/$3"/><p class="caption">$2</p></div>'); // 內部圖片 ![[text]](file)
  md  = md.replace(/(\s)\[\[([^\]]+?)\]\]\(([^:\)]+):([^:\)]+)\)/gi, '$1<a href="#$3:$4" class="innerLink">$2</a>'); // 內部連結 [[text]](file)
  md  = md.replace(/(\s)\[\[([^\]]+?)\]\]\((.*?)\)/gi, '$1<a href="#'+path().domain+':$3" class="innerLink">$2</a>'); // 內部連結 [[text]](file)
  md  = md.replace(/(\s)\[\[([^\]:]+):([^\]:]+)\]\]/gi, '$1<a href="#$2:$3" class="innerLink">$2:$3</a>'); // 內部連結 [[file]]
  md  = md.replace(/(\s)\[\[([^\]:]+?)\]\]/gi, '$1<a href="#'+path().domain+':$2" class="innerLink">$2</a>'); // 內部連結 [[file]]
  md  = md.replace(/(\s)\$\$([^$]+?)\$\$/gi, '$1<script type="math/tex">$2</'+'script>');// 數學式 $$[latex]$$,  刻意把 '</'+'script>' 分開，避免瀏覽器認為是真的 script 區塊
  return converter.makeHtml(md);

var files = getFiles('web/db/'+domain+'/md');
// console.log(files);
for (var i in files) {
  console.log(files[i]);
}
*/
