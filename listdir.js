'use strict';
var fs = require("fs");

function getFiles(dir,files_){
    files_ = files_ || [];
    if (typeof files_ === 'undefined') files_=[];
    var files = fs.readdirSync(dir);
    for(var file in files){
        if (!files.hasOwnProperty(file)) continue;
        var name = dir+'/'+files[file];
        if (fs.statSync(name).isDirectory()){
            getFiles(name,files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

var domain = process.argv[2];
var files = getFiles('web/db/'+domain+'/md');
// console.log(files);
for (var i in files) {
  console.log(files[i]);
}

