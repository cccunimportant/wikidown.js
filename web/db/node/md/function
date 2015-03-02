# JavaScript 的函數、參數與閉包

在本文當中，我們將介紹 JavaScript 當中最有趣的一個領域，那就是「函數」(function) 的用法，還有「閉包」 (closure) 這種相當特別的概念。

## 函數的宣告

在 JavaScript 當中，函數的宣告方法大致有兩種，第一種的宣告方法就和一般程式語言 (C/C++, Python, Java) 等差不多，是採用 f(a,b,c...) 這種方式宣告的，但是必須在前面加上 function 這個關鍵字。

在以下範例中， sub(a,b) 就是採用這種方式宣告的一個範例。

檔案：function.js

```javascript
// 第一種寫法，直接宣告函數
function sub(a,b) {         
  return a-b;
}

// 第二種寫法，將匿名函數指定給變數。
var add = function(a,b) {     
  return a+b;
}
console.log("add(3,5)=", add(3,5), " sub(7,2)=", sub(7,2));
```

執行結果：

```
D:\js\code>node function.js
add(3,5)= 8  sub(7,2)= 5
```

但是、在 JavaScript 當中，還有一種比較特別函數宣告方式，是在宣告了一個「匿名函數」之後，再把這個函數「塞給」一個變數。就像上述的 `var add = function(a,b) ...` 的做法，這樣我們就可以用 add(3,5) 這樣的方式去呼叫該函數了。


## 函數型態的參數

在上面的 add 範例中，我們將「函數」塞給一個變數，而且還可以直接把該變數當作函數來呼叫。

那麼、我們能不能將函數當作參數來傳遞呢？ 

關於這點、當然是可以的，以下是一個將「函數當作參數」的範例。

檔案： fptr

```javascript
function sub(a,b) {         
  return a-b;
}

function f5(f, a) {
  return f(a, 5);
}

console.log("sub(8,5)="+sub(8, 5));
console.log("f5(sub,8)="+f5(sub,8));
```

執行結果

```
D:\Dropbox\Public\web\js\code>node fptr
sub(8,5)=3
f5(sub,8)=3
```

您可以看到，函數 `f5(f, a)` 的參數 f，其實又是一個函數，因為我們在 f(a,5) 當中把 f 當作函數來呼叫。

所以、當我們呼叫 f5(sub, 8) 的時候，該函數會傳回 3，因為當我們將 f5(sub, 8) 內容中的 f 取代為 sub，而 a 取代為 8 時，就會發現 return 語句的 f(a,5) 其實就是 sub(8,5)，所以當然就會傳回 3 囉！

## 參數的存取

對於一般的函數，參數個數是固定的，例如上述範例的 add(a,b) 與 sub(a,b) ，都很明確的有兩個參數，因此直接用 a, b 就可以存取該參數。

但是、對於那種有不確定參數個數的函數，就沒有對應名稱可以用來存取這些參數了。

還好、javascript 在呼叫每個函數時，都會將參數放到一個稱為 arguments 的變數裏，arguments 是一個陣列，我們可以透過 arguments 來存取每一個參數，以下是一個範例。

檔案：arg.js

```javascript
function print() {
  for (var i in arguments) {
    console.log(i, ":", arguments[i]);
  }
}

print(3, 2.71828, "hello");
```

執行結果：

```
D:\js\code>node arg.js
0 : 3
1 : 2.71828
2 : hello
```

這種變動參數個數的函數，有時候很有用。例如、若我們要寫一個可以找出最小值的函數，就可以用下列的 min() 函數。

檔案：min.js

```javascript
function min() {
  var m = arguments[0];
  for (var i in arguments) {
    if (arguments[i] < m)
      m = arguments[i];
  }
  return m;
}

var x = min(3, 7, 2, 9, 1, 5, 8);
console.log("x=min(3, 7, 2, 9, 1, 5, 8)=", x);
```

執行結果

```
D:\Dropbox\Public\web\js\code>node min.js
x=min(3, 7, 2, 9, 1, 5, 8)= 1
```

## 變數的領域範圍

在上述的 min.js 程式中，您可以看到我們經常會用 var 這個關鍵字來宣告變數。但事實上，即使我們不用 var 宣告，該程式也能正常運作。以下是一個完全沒有 var 宣告的版本。

檔案：min2.js

```javascript
function min() {
  m = arguments[0];
  for (i in arguments) {
    if (arguments[i] < m)
      m = arguments[i];
  }
  return m;
}

x = min(3, 7, 2, 9, 1, 5, 8);
console.log("x=min(3, 7, 2, 9, 1, 5, 8)=", x);
```

但是、上述這個沒有 var 的版本 min2.js ，與那個有 var 的版本其實在某些細微處有所不同，因為採用 var 宣告時，該變數將會是一個區域變數，而沒有採用 var 宣告就直接指定的方式，則會是一個「全域」變數，這種全域變數有可能造成更多的衝突問題，所以在一般的情況下，我們都會加上 var 宣告。

關於是否該為變數加上 var 的更詳細描述，可以參考下列文章：

* [JavaScript 語言核心（3）你的變數 var 了嗎？](http://www.codedata.com.tw/javascript/essential-javascript-variable/)

## 閉包 (Closure)

對於很多 C/C++、Java、C#、VB 等語言的「程式人」而言，「閉包」是個很奇特而難以理解的概念，但對於 JavaScript、Lua、Python、Ruby 等動態語言來說，「閉包」卻是個很自然的用法，一點都不神秘。

其實、是「閉包」 (Closure) 這個詞給人的感覺太深奧了，我們不需要迷惑於這個名詞的神秘感，請讓我們先來看一個範例。

檔案： closure.js

```javascript
function sub(a,b) {         
  return a-b;
}

function sub5(a) {
  return sub(a, 5);
}

function fsub5(a) {
  return function() {
    return sub(a, 5);
  };
}

console.log("sub(8,5)="+sub(8, 5));
console.log("sub5(8)="+sub5(8));
console.log("fsub5(8)="+fsub5(8));
console.log("fsub5(sub,8)()="+fsub5(8)());
```

執行結果：

```
D:\Dropbox\Public\web\js\code>node closure
sub(8,5)=3
sub5(8)=3
fsub5(8)=function () {
    return sub(a, 5);
  }
fsub5(sub,8)()=3
```

在上述範例中，我們看到 sub(a,b) 是個很正常的函數，當我們呼叫 sub(8,5) 時會傳回 3。

如果我們運用 sub(a,b) 定義一個傳回 sub(a,5) 的函數為 sub5(a)，那麼 sub5(8) 同樣也會傳回 3。

上述程是最後的 fsub5 函數，則不像前面的 sub5 一樣傳回一個值，而是傳回一個函數，這個函數的內容如下：

```javascript
  return function() {
    return sub(a, 5);
  }
```

這下問題就來了，fsub5 所傳回的是一個函數，而這個函數裏的 a 到底是什麼東西呢？

這時，請讓我們把眼光放大一點點：

```javascript
function fsub5(a) {
  return function() {
    return sub(a, 5);
  };
}
```

您會發現，原來所傳回來的那個函數裏的 a ，應該就是 fsub5(a) 的參數 a，這種「把外層變數一起包進來」的機制，就稱為「閉包」。

換句話說、只要直接在函數裏引用外層的變數，然後當我們將「函數」封閉起來傳回時，該函數仍然可以正常使用，這就是閉包的概念了。

## 結語

在本文中，我們介紹了 JavaScript 中的「函數、參數與閉包」等觀念，這些觀念在我們進行模組化或撰寫大型程式的時候，將會是非常重要的根基。

JavaScript 當中的函數，可以被塞進變數裏，然後再將變數當作函數來呼叫。也可以放在參數裏，拿來傳遞給另一個函數使用，這種方式有點像 C 語言當中的函數指標，只是感覺更精簡，更有彈性而已。

而那個感覺有點神祕的「閉包」觀念，也只不過是「在傳回一整個函數時、順便把外層的變數給包進來而已」，並不真的那麼神祕啊！





