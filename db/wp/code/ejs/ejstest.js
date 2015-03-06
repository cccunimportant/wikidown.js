var fs = require('fs');
var ejs = require('ejs');

var template = fs.readFileSync('book.ejs', 'utf8');

var html = ejs.render(template, {
	title: '天國來的鈔票', 
	chapter:['國王', '皇后', '大臣', '革命', '銀行家']}
);

console.log(html);