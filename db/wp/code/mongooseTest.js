var mongoose = require('mongoose');
var log = console.log;
log("connect");

mongoose.connect('mongodb://localhost/test');

var person = mongoose.model('person', { name: String, email:String });

var p1 = new person({ name: 'ccc', email:"ccckmit@gmail.com" });

p1.save(function (err) {
  if (err) {}
  console.log('saved');
//  mongoose.connection.close()
});


person.find({ name: "ccc" }, function (err, docs) {
            log("docs="+docs);
  mongoose.connection.close()
});

/*
person.find({ name:"ccc" }).remove(function(err, docs) {
  log("docs="+docs);
  mongoose.connection.close()
});
*/

log("end");


