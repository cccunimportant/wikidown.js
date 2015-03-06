## 編輯小語

繼 [上期](http://programmermagazine.github.io/201501/htm/home.html) 探討了 javascript 前端技術之後，本期我們將焦點放在筆者開發的一個維基型網誌專案 [wikidown.js] 上，用實際的案例探討如何將前後端結合在一起的方法。

在 [wikidown.js] 專案中，我們採用了前端的 HTML/CSS/JavaScript 等必要技術，然後用 [bootstrap] 作為介面以便支持手機類的行動裝置，並用了 [showdown.js] 這個開放原始碼專案進行 markdown 文件轉為 HTML 的動作，最後再加上 [highlight.js] 為程式碼區塊加上顏色，還有用 [MathJax] 顯示latex 數學式的功能。

而在  [wikidown.js] 的後端伺服器部份，則是非常輕量級的，因為我們將所有程式盡可能放在前端，所以後端就只剩下了檔案的讀寫動作。

後端部份採用 [node.js] 作為伺服平台，然後用 [express.js] 套件作路徑 (routing) 的比對處理並輸出靜態網站，接著用 [serve-index.js] 套件提供靜態檔案瀏覽功能，於是 [wikidown.js] 就完成了。

雖然 [wikidown.js] 看來用到了很多套件，但是事實上整個專案的程式碼非常小，主要包含 [wikidown.html] 共 200 行，還有 [wikiServer.js] 共 60 行，可以說是一個超小型專案，但是『麻雀雖小、卻是五臟俱全』阿！

寫了 [wikidown.js] 維基網誌系統後，我深深地體會到，現在的程式設計是很難獨立建構出整個系統的，我們只有站在開放原始碼的肩膀上，才能做得更快又更好。

就像牛頓的那句名言：『只有站在巨人的肩膀上、我們才能看得更高更遠』，對於程式人而言，那個巨人就是 [開放原始碼] ，我們只有站在 [開放原始碼] 的基礎上，才能做得又快又好阿！

---- （「程式人雜誌」編輯 - 陳鍾誠）

[wikidown.js]:wikidown:home
[highlight.js]:https://highlightjs.org/
[bootstrap]:http://getbootstrap.com/
[showdown.js]:https://github.com/showdownjs/showdown
[MathJax]:http://www.mathjax.org/
[node.js]:http://nodejs.org/
[express.js]:http://expressjs.com/
[wikidown.html]:https://github.com/ccckmit/wikidown.js/blob/master/web/wikidown.html
[wikiServer.js]:https://github.com/ccckmit/wikidown.js/blob/master/wikiServer.js
[開放原始碼]:http://zh.wikipedia.org/zh-tw/%E5%BC%80%E6%94%BE%E6%BA%90%E4%BB%A3%E7%A0%81


