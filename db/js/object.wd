# JavaScript 的物件與 JSON

在本文當中，我們將介紹 JavaScript 的基本物件宣告,以及可以用來表達物件的JSON語法。

當然，您也可以不要用交談式界面來測試 JSON 語法，而是寫成可以執行的程式，以下是一個範例。

### JavaScript 物件的精簡表示法 -- JSON 物件資料交換格式

如果我們想直接在程式中宣告一個複雜的物件，可以使用 JavaScript 中的 {...} 與 [...] 的語法組合，用簡單的語法建構出整個物件。這種格式也常被用在網頁程式的資料交換當中，因此有一個很特別的名稱叫 JSON （Javascript Object Notation）。

目前網路上最常使用的資料交換格式是 XML，但是 XML 文件很繁瑣且囉嗦，讓使用者撰寫不方便，而且不容易嵌入網頁中進行處理。為了讓網頁上的共通程式語言 JavaScript 可以輕易的交換資料，網頁程式的設計者也常用 JSON 取代 XML 進行資料交換。

以下是一個採用 JSON 格式的朋友資料範例，該範例中有兩個朋友，一個是 John, 22 歲，另一個是 Mary, 28 歲。

```JavaScript
{
  "friends": [
     {"name": "John", "age": 22 }
     {"name": "Mary", "age": 28 }
  ]
}
```

程式範例：json.js

```javascript
var george = {
  "name": "George",
  "age": 25,
  "friends": [
     {"name": "John", "age": 22 },
     {"name": "Mary", "age": 28 }
  ]
};

console.log("george.age="+george.age);
console.log("george.friends:");
var friends = george.friends;
for (i in friends)
  console.log("    "+friends[i].name+" is "+friends[i].age+"years old!");
```

執行結果

```
nqu-192-168-61-142:code mac020$ node json
george.age=25
george.friends:
    John is 22years old!
    Mary is 28years old!
```

## 物件的宣告

在 javascript 當中，物件是整個系統的核心結構，幾乎整個javascript語言都是建構在物件之上的。

javascript的物件用大括號表示，所以我們可以用下列語法建立一個名為 person 的空物件,然後放一些欄位進去。

```javascript
var person = {};
person.name = "ccc";
person.email = "ccckmit@gmail.com";
```

我們也可以用更簡潔的方式表達上述的物件,如下所示:

```javascript
var person = { name:"ccc", email:"ccckmit@gmail.com" };
```

由於物件的宣告是這麼的簡單，所以我們可以直接在 node 的交談界面中建立物件並輕易的進行操作。

```javascript
ccc@ccc-CP1130:~$ node
> x={};
{}
> person={};
{}
> person.name="ccc";
'ccc'
> person.email="ccckmit@gmail.com"
'ccckmit@gmail.com'
> person
{ name: 'ccc', email: 'ccckmit@gmail.com' }
> p=person
{ name: 'ccc', email: 'ccckmit@gmail.com' }
> p
{ name: 'ccc', email: 'ccckmit@gmail.com' }
> p.print=function() { console.log(this.name+" email="+this.email); }
[Function]
> p.print
[Function]
> p.print()
ccc email=ccckmit@gmail.com
undefined
> p.age = 45
45
> p
{ name: 'ccc',
  email: 'ccckmit@gmail.com',
  print: [Function],
  age: 45 }
> 
```

您可以看到我們在上述操作中建立了person物件,然後設定name與email欄位，接著加入print函數,而該函數直接可以用this.name, this.email 等方式取得欄位後輸出，讓print函數可以順利的印出物件內容，這樣的函數在物件導向的術語中稱為『成員函數』。

上述的操作是逐步加入欄位，其實我們也可以在建立物件時就將欄位全部放進去，只是要採用 `:` 符號將欄位名稱與內容隔開,這種格式稱為JSON格式,以下是一個範例。

```javascript
> p2 = { name:"john", email:"john@gmail.com", age:20 }
{ name: 'john',
  email: 'john@gmail.com',
  age: 20 }
```

我們也可以將欄位設定為其他物件，

```javascript
> p2.friend = p
{ name: 'ccc',
  email: 'ccckmit@gmail.com',
  print: [Function],
  age: 45 }
> p2
{ name: 'john',
  email: 'john@gmail.com',
  age: 20,
  friend: 
   { name: 'ccc',
     email: 'ccckmit@gmail.com',
     print: [Function],
     age: 45 } }
> 
```

當然、朋友只有一個的話，真的太孤單了，所以我們應該加一個型態為陣列的 friends 欄位，讓john有很多個朋友，而不是只有一個朋友，於是我們進行修正操作如下。

```javascript
> p2.friends = [ p ]
[ { name: 'ccc',
    email: 'ccckmit@gmail.com',
    print: [Function],
    age: 45 } ]
> p2
{ name: 'john',
  email: 'john@gmail.com',
  age: 20,
  friend: 
   { name: 'ccc',
     email: 'ccckmit@gmail.com',
     print: [Function],
     age: 45 },
  friends: 
   [ { name: 'ccc',
       email: 'ccckmit@gmail.com',
       print: [Function],
       age: 45 } ] }
> delete p2.friend
true
> p2
{ name: 'john',
  email: 'john@gmail.com',
  age: 20,
  friends: 
   [ { name: 'ccc',
       email: 'ccckmit@gmail.com',
       print: [Function],
       age: 45 } ] }
> p3={name:"mary", age:18}
{ name: 'mary', age: 18 }
> p2.friends.push(p3)
2
```

接著，當我們打入 p2 這個變數名稱之後，node交談界面會印出如下結果。

```javascript
> p2
{ name: 'john',
  email: 'john@gmail.com',
  age: 20,
  friends: 
   [ { name: 'ccc',
       email: 'ccckmit@gmail.com',
       print: [Function],
       age: 45 },
     { name: 'mary', age: 18 } ] }
> 
```

這個結果就是一種類似JSON格式的語法，只不過 JSON裡面不允許有函數，所以上述的print欄位是不應該出現在JSON裡面的，讓我們用  delete 指令將其刪除，就得到了標準的JSON物件格式了。

```javascript
> delete p.print
true
> p2
{ name: 'john',
  email: 'john@gmail.com',
  age: 20,
  friends: 
   [ { name: 'ccc',
       email: 'ccckmit@gmail.com',
       age: 45 },
     { name: 'mary', age: 18 } ] }
> 
```

有關 JSON物件的語法格式，請參考下列網站。

* <http://www.json.org/>

## 結語

在本文中，我們介紹了 JavaScript 中的「物件與JSON格式」等觀念，您可以看到javascript的物件表達非常的簡單。

但有個小問題是，一般物件導向語言裡的類別 (class) 概念，在這裡好像沒有提到，如果您心中泛起了這樣的疑問，代表您對物件導向已經有相當的概念了。不過，javascript的物件導向與 java, C#, C++ 等語言很不相同，因為 javascript 採用了原型 (prototype) 這種物件導向的實作方式，這種方式很有彈性，但對已經學過 java, C#, C++ 等物件導向語言的人來說，可以說是非常的詭異，我們將在下一章當中介紹 javascript 這種基於原型的物件導向設計！





