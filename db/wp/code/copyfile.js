var fs = require('fs');
var file = fs.readFileSync(process.argv[2]);
console.log(file);
fs.writeFileSync(process.argv[3], file);
