# 關於 wikidown

* [wikidown](wikidown.html) 是一個使用 [markdown] 語法編輯的 [維基] （ wiki） 系統，採用 [node.js] 作為伺服器 ( wikiServer.js )。
* [wikidown](wikidown.html) 在 github pages 上的首頁為 <http://ccckmit.github.io/wikidown1/public/wikidown.html>
* [wikidown](wikidown.html) 的原始碼位於 <https://github.com/ccckmit/wikidown1>
* [wikidown](wikidown.html) 的專案的程式設計原理請參考文章 -- [使用 node.js 設計 wikidown 網誌系統](wikidownCaseStudy.html)
* [wikidown](wikidown.html) 顯示連結時， [淡咖啡色](coffee.html)  代表內部連結，[淡藍色](http://www.rapidtables.com/web/color/RGB_Color.htm) 代表外部連結。
* [wikidown](wikidown.html) 支援內部連結語法，使用時請用 `![[圖片名稱]](filename)` 符號將數學式框起來，圖片請放在 web/img/ 資料夾底下，請參考 [內部圖片範例](imgtest.html) 。
* [wikidown](wikidown.html) 支援latex數學式，使用時請用 `$...$` 符號將數學式框起來，wikidown會用MathJax將數學式呈現出來，請參考 [數學式範例](mathtest.html) 。
* [wikidown](wikidown.html) 支援程式碼自動上色，採用 [highlight.js](https://highlightjs.org/) 對程式碼進行上色動作，請參考 [程式碼範例](codetest.html) 。
* [wikidown](wikidown.html) 的作者為 [陳鍾誠](ccckmit.html) 。

[markdown]:http://markdown.tw/
[維基]:http://zh.wikipedia.org/wiki/%E7%B6%AD%E5%9F%BA
[node.js]:http://nodejs.org/