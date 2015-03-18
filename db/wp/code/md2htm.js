var marked = require('./marked');
var fs = require('fs');
var argv = process.argv;
var md = fs.readFileSync(process.argv[2], "utf8");
// console.log("===========md==============\n"+md);

// Set default options
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  langPrefix: 'language-',
  highlight: function(code, lang) {
    if (lang === 'js') {
      return highlighter.javascript(code);
    }
    return code;
  }
});

var html = marked(md);

fs.writeFileSync(process.argv[3], html, "utf8");
// console.log("===========md==============\n"+html);
