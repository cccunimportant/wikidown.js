# 在 node.js 中用 mongoose 連接 mongoDB

## 安裝 mongoDB

```
brew install mongodb
mkdir -p /data/db
mongod
```

參考： <http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/>

## 程式

檔案：mongooseTest

```javascript
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
```

## 執行結果

```
nqu-192-168-61-142:code mac020$ node mongooseTest
connect
end
docs=
saved
nqu-192-168-61-142:code mac020$ node mongooseTest
connect
end
docs={ _id: 5508eb061d12dd616af9de33,
  name: 'ccc',
  email: 'ccckmit@gmail.com',
  __v: 0 }
saved
nqu-192-168-61-142:code mac020$ 
```