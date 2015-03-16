# 翻譯系統 (簡易英翻中)

## 執行結果

```
$ node e2c a dog chase a cat
[ '一隻', '狗', '追', '一隻', '貓' ]
```

## 程式碼

```javascript
var e2c = { dog:"狗", cat:"貓", a: "一隻", chase:"追", eat:"吃" };

function mt(e) {
  var c = [];
  for (i in e) {
    var eword = e[i];
    var cword = e2c[eword];
    c.push(cword);
  }
  return c;
}

var c = mt(process.argv.slice(2));
console.log(c);
```
