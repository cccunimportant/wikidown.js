# JavaScript 的字串處理

## 字串物件 String

String 物件的成員

| 屬性/函數 | 說明 | 範例 | 結果 | 
|---------|-----------------|-------------------------|--------------------------------| 
| constructor | 傳回建構函數 | "Hello".constructor | function String() { [native code] } |
| length | 傳回長度 | "Hello".length | function String() { [native code] } |
| prototype | 傳回原型 | "Hello".prototype | undefined |
| charAt() | 傳回第 i 個字元 | "Hello".charAt(1) | e |
| charCodeAt() | 傳回第 i 個字元的 Unicode | "Hello".charCodeAt(1) | 101 |
| concat() | 連接兩個以上的字串 | "Hello".concat(" World", " !") | Hello World ! |
| fromCharCode() | 將 Unicode 代碼轉為字元 | "Hello".fromCharCode(101, 102) | ef |
| indexOf() | 傳回子字串的位置 | "Hello".indexOf("el") | 1 |
| lastIndexOf() | 傳回子字串的位置 (倒著掃瞄) | "Hello".lastIndexof("l") | 3 |
| match() | 搜尋正規表達式 | "Hello".match("[aeiou]") | 2 |
| replace() | 取代正規表達式 | "Hello".replace("l", "L") | HeLLo |
| search() | 搜尋正規表達式 | "Hello".search("[aeiou]") | e |
| slice() | 切出字串 | "Hello".slice(-3) | llo |
| split() | 分割字串 | "Hello".split("e") | H,llo |
| substr() | 取出 from 長 len 的子字串 | "Hello".substr(2,2) | ll |
| substring() | 取出 from 到 to 的子字串 | "Hello".substring(2,4) | llo |
| toLowerCase() | 轉為小寫 | "Hello".toLowerCase() | hello |
| toUpperCase() | 轉為大寫 | "Hello".toUpperCase() | HELLO |
| valueOf() | 傳回原型值 | "Hello".valueOf() | Hello |

程式範例

```html
<html>
<body>
<script type="text/javascript">
var s = "Hello";
document.write("s = 'Hello'");
document.write("s.constructor = "+s.constructor+"<BR/>");
document.write("s.length = "+s.length+"<BR/>");
document.write("s.prototype = "+s.prototype+"<BR/>");
document.write("s.charAt(1) = "+s.charAt(1)+"<BR/>");
document.write("s.charCodeAt(1) = "+s.charCodeAt(1)+"<BR/>");
document.write("s.concat(' World', ' !') = "+s.concat(' World', ' !')+"<BR/>");
document.write("String.fromCharCode(72,69,76,76,79) = "+String.fromCharCode(72,69,76,76,79)+"<BR/>");
document.write("s.indexOf('el') = "+s.indexOf('el')+"<BR/>");
document.write("s.lastIndexOf('l') = "+s.lastIndexOf('l')+"<BR/>");
document.write("s.match('[aeiou]') = "+s.match('[aeiou]')+"<BR/>");
document.write("s.replace('l', 'L') = "+s.replace('l', 'L')+"<BR/>");
document.write("s.search('[aeiou]') = "+s.search('[aeiou]')+"<BR/>");
document.write("s.slice(2,4) = "+s.slice(2,4)+"<BR/>");
document.write("s.slice(2) = "+s.slice(2)+"<BR/>");
document.write("s.slice(-3) = "+s.slice(-3)+"<BR/>");
document.write("s.split('e') = "+s.split('e')+"<BR/>");
document.write("s.substr(2,2) = "+s.substr(2,2)+"<BR/>");
document.write("s.substring(2,4) = "+s.substr(2,4)+"<BR/>");
document.write("s.toLowerCase() = "+s.toLowerCase()+"<BR/>");
document.write("s.toUpperCase() = "+s.toUpperCase()+"<BR/>");
document.write("s.valueOf() = "+s.valueOf()+"<BR/>");
</script>
</body>
</html>
```

執行結果

```
s = 'Hello's.constructor = function String() { [native code] }
s.length = 5
s.prototype = undefined
s.charAt(1) = e
s.charCodeAt(1) = 101
s.concat(' World', ' !') = Hello World !
String.fromCharCode(72,69,76,76,79) = HELLO
s.indexOf('el') = 1
s.lastIndexOf('l') = 3
s.match('[aeiou]') = e
s.replace('l', 'L') = HeLlo
s.search('[aeiou]') = 1
s.slice(2,4) = ll
s.slice(2) = llo
s.slice(-3) = llo
s.split('e') = H,llo
s.substr(2,2) = ll
s.substring(2,4) = llo
s.toLowerCase() = hello
s.toUpperCase() = HELLO
s.valueOf() = Hello
```

## 正規表達式

正規語法 (Regular Grammar) 是一種用來比對字串的語法，這種語法被引入 Perl 語言之後成為重要的程式設計工具。
此種標準的正規語法後來被稱為正則表達式 (Regular Expression)。目前，大部分的語言都已納入正則表達式的函式庫，
正規表達是可以說是程式設計師必定要瞭解的工具，也就是常識的一部分。系統程式設計師更應該要瞭解正則表達式，
因為正規語法是程式語言當中，用來描述基本詞彙 (Vocabulary)，並據以建構詞彙掃描器(Lexer)的基礎語法，
Lexer 是編譯器的基本元件之一。

假如我們要用正則表達式描述整數數字，那麼，可以用 `[0123456789]+` 這個表達式，其中的中括號 `[` 與 `]` 會框住一群
字元，用來代表字元群，加號 `+` 所代表的是重複 1 次或以上，因此，該表達式就可以描述像 3702451 這樣的數字。
然而，在正則表達式中，為了更方便撰寫，於是允許用 `[0-9]+` 這樣的式子表達同樣的概念，其中的 0-9 其實就
代表了 0123456789 等字元，這是一種簡便的縮寫法。甚至可以再度縮短後以 `[\d]+` 代表，其中的 `\d`    就代表
數字所成的字元集合。

利用範例學習是理解正則表達式的有效方法，表格 1 就顯示了一些具有代表性的正則表達式範例。

表格 1. 正則表達式的範例

| 語法                 |    正規表達式             |           範例 | 
|--------------------|---------------------------|-----------------------------------------------------| 
| 整數                  |  `[0-9]+`                      |   3704 | 
| 有小數點的實數 |   `[0-9]+\.[0-9]+` |   7.93 | 
| 英文詞彙              |   `[A-Za-z]+`                 |  Code | 
| 變數名稱              |   `[A-Za-z_][A-Za-z0-9_]*` |  _counter | 
| Email                  |  `[a-zA-Z0-9_]+@[a-zA-Z0-9\._]+` | ccc@kmit.edu.tw | 
| URL                   |   `http://[a-zA-Z0-9\./_]+`   |   http://ccc.kmit.edu.tw/mybook/ | 

為了協助讀者理解這些範例，我們有必要對範例中的一些正規表達式符號進行說明。

在實數的範例中，使用 `\.` 代表小數點符號 .，不熟悉正則表達式的讀者一定覺得奇怪，為何要加上斜線符號 `\` 呢？
這是因為在正則表達式當中，有許多符號具有特殊意義，例如點符號 `.` 是用來表示任意字元的，星號 `*` 是代表 0 次
或以上，加號 `+` 代表一次或以上，在正則表達式當中，有許多這類的特殊字元，因此用斜線 `\` 代表跳出字元，就像
C 語言當中 printf 函數內的用途一樣。因此，當我們看到 `\` 符號時，必須繼續向後看，才能知道其所代表的意義。
表格 2 列出了正則表達式當中大部份的重要符號之意義，以供讀者參考。

表格 2. 正則表達式當中的符號之意義

| 字元 | 描述 | 
| -----| ----------| 
| ^ | 比對開始位置 | 
| $ | 比對結束位置。| 
| * | 零次或以上 | 
| + | 一次或以上 | 
| ? | 零次或一次 | 
| {n} | n 次。 | 
| {n,} | n 次或以上 | 
| {n,m} | n 到 m 次 | 
| ? | 非貪婪模式 | 
| . | 比對除"\n"之外字元 | 
| (?:pattern) | 比對 pattern 樣式 | 
| (?=pattern) | 正向預查，例如，Windows (?=95)  可比對到 "Windows 95" 中的 "Windows"，但不能比對 Windows XP 中的 Windows。| 
| (?!pattern) | 負向預查，例如 Windows(?!95) 能比對 "Windows XP"中的 "Windows"，但不能比對 "Windows 95" 中 的"Windows"。| 
| x ｜y | 比對 x 或 y。| 
| [xyz] | 包含 xyz 等字元。| 
| [^xyz] | 不包含 xyz 等字元。| 
| [a-z] | 字元範圍 a-z。| 
| [^a-z] | 不包含字元範圍 a-z。| 
| \\b | 比對一個單詞邊界，也就是指單詞和空格間的位置。例如，"er\b"可以比對"never"中的"er"，但不能比對"verb"中的"er"。| 
| \\B | 比對非單詞邊界。"er\B"能比對"verb"中的"er"，但不能比對"never"中的"er"。| 
| \\cx | 比對由x指明的控制字元。例如，\cM比對一個Control-M或回車符。x的值必須為A-Z或a-z之一。否則，將c視為一個原義的"c"字元。| 
| \\d | 比對一個數位字元。等價於[0-9]。| 
| \\D | 比對一個非數位字元。等價於[^0-9]。| 
| \\f | 比對一個換頁符。等價於\x0c和\cL。| 
| \\n | 比對一個分行符號。等價於\x0a和\cJ。| 
| \\r | 比對一個回車符。等價於\x0d和\cM。| 
| \\s | 比對任何空白字元，包括空格、定位字元、換頁符等等。等價於[\f\n\r\t\v]。| 
| \\S | 比對任何非空白字元。等價於[^\f\n\r\t\v]。| 
| \\t | 比對一個定位字元。等價於\x09和\cI。| 
| \\v | 比對一個垂直定位字元。等價於\x0b和\cK。| 
| \\w | 比對包括底線的任何單詞字元。等價於"[A-Za-z0-9_]"。| 
| \\W | 比對任何非單詞字元。等價於"[^A-Za-z0-9_]"。| 
| \\xn | 比對n，其中n為十六進位轉義值。十六進位轉義值必須為確定的兩個數位長。例如，"\x41"比對"A"。"\x041"則等價於"\x04"&"1"。規則運算式中可以使用ASCII編碼。| 
| \\num | 比對num，其中num是一個正整數。對所獲取的比對的引用。例如，"(.)\1"比對兩個連續的相同字元。| 
| \\n | 標識一個八進制轉義值或一個向後引用。如果\n之前至少n個獲取的子運算式，則n為向後引用。否則，如果n為八進位數字(0-7)，則n為一個八進制轉義值。| 
| \\nm | 標識一個八進制轉義值或一個向後引用。 如果\nm之前至少有nm個獲得子運算式，則nm為向後引用。如果\nm之前至少有n個獲取，則n為一個後跟文字m的向後引用。如果前面的條件都不滿足，若n和m均為八進位數字(0-7)，則\nm 將比對八進制轉義值nm。| 
| \\nml | 如果n為八進位數字(0-3)，且m和l均為八進位數字(0-7)，則比對八進制轉義值nml。| 
| \\un | 比對n，其中n是一個用四個十六進位數位表示的Unicode字元。例如，\u00A9比對版權符號（©）。| 
正則表達式在許多語言當中(像是 Java, C#, Ruby, Python 等) 都已經有支援良好的 regular expression 函式庫。


```javascript
<html>
<body>

<script type="text/javascript">
document.write("<pre>\n");
String.prototype.trim = function() { return this.replace(/(^\s*)|(\s*$)/g, ""); }
document.write("' abc '.trim()=|"+' abc '.trim()+"|\n");
var re = new RegExp("\\d+", "gi");
var str = "name:john age:20 birthday:1990/8/31";
var m = null;
while (m = re.exec(str))
  document.write(m + "\n");
var p = parse(str);
document.write("p.name="+p.name+" age="+p.age+" year="+p.year+" month="+p.month+" day="+p.day);
document.write("</pre>\n");

function parse(data) {
    var e=new RegExp("name:(\\w+) age:(\\d+) birthday:(\\d+)/(\\d+)/(\\d+)", "gi");

    if (data.match(e)) {
        return  {exp: RegExp['$&'],
                name: RegExp.$1,
                age:RegExp.$2,
                year:RegExp.$3,
                month:RegExp.$4,
                day:RegExp.$5};
    }
    else {
        return null;
    }
}
</script>

</body>
</html>
```

執行結果

```
' abc '.trim()=|abc|
20
1990
8
31
p.name=john age=20 year=1990 month=8 day=31
```

## eval 函數 -- 解譯字串中的程式

```JavaScript
<script type="text/javascript">
var a=3, b=5;
alert('a+b='+eval('a+b'));
</script>
```

## 參考文獻
* Wikipedia:Regular expression -- http://en.wikipedia.org/wiki/Regular_expression
* 維基百科:正規表式 -- http://zh.wikipedia.org/zh-tw/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F
* 鳥哥的 Linux 私房菜:第十二章、正規表示法與文件格式化處理 -- http://linux.vbird.org/linux_basic/0330regularex.php
* 石頭閒語:Regular Expression (RegExp) in JavaScript -- http://blog.roodo.com/rocksaying/archives/2670695.html
* 字串樣版 Regexp: 兼談長線學習投資 -- http://www.cyut.edu.tw/~ckhung/b/re/
* 在 C 程式中，使用 Regex (Regular Expression) library -- http://blog.roodo.com/rocksaying/archives/3866523.html
