var walk  = require('walk');
var wdlib = require('./wdlib');
var c     = console;
var dir;

if (process.argv.length > 2) {
  var domain = process.argv[2];
  dir = 'db/'+domain+'/wd';
} else
  dir = 'db';

var walker  = walk.walk(dir, { followLinks: true });

walker.on('file', function(dir, stat, next) {
  var file = stat.name;
  if (file.indexOf('.wd') >= 0 && file.indexOf('*') < 0) {
    c.log('file='+file+' dir='+dir);
    wdlib.toHtmlFile(file, dir);
  }
  next();
});

walker.on('end', function() {});

