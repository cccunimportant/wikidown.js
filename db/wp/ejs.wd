# javascript 套件的用法 -- ejs 樣板引擎

專案下載： @[[ejs.zip]](code/ejs.zip)

## 程式

檔案：ejstest.js

```javascript
var fs = require('fs');
var ejs = require('ejs');

var template = fs.readFileSync('book.ejs', 'utf8');

var html = ejs.render(template, {
	title: '天國來的鈔票', 
	chapter:['國王', '皇后', '大臣', '革命', '銀行家']}
);

console.log(html);
```

## 樣板

檔案：book.ejs

```javascript
<h1><%= title %></h1>
<ol>
    <% for(var i=0; i<chapter.length; i++) { %>
        <li><%= chapter[i] %></li>
    <% } %>
</ol>
```

## 執行結果

```
D:\git\ejs>node ejstest
<h1>天國來的鈔票</h1>
<ol>

        <li>國王</li>

        <li>皇后</li>

        <li>大臣</li>

        <li>革命</li>

        <li>銀行家</li>

</ol>
```

