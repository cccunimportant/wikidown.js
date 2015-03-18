# Node.js 實作：基於 markdown 的電子書出版系統

## Markdown 模組

GFM 格式的表格

| Heading 1 | Heading 2
| --------- | ---------
| Cell 1    | Cell 2
| Cell 3    | Cell 4

| Header 1 | Header 2 | Header 3 | Header 4 |
| :------: | -------: | :------- | -------- |
| Cell 1   | Cell 2   | Cell 3   | Cell 4   |
| Cell 5   | Cell 6   | Cell 7   | Cell 8   |

    Test code

Header 1 | Header 2
-------- | --------
Cell 1   | Cell 2
Cell 3   | Cell 4

Header 1|Header 2|Header 3|Header 4
:-------|:------:|-------:|--------
Cell 1  |Cell 2  |Cell 3  |Cell 4
*Cell 5*|Cell 6  |Cell 7  |Cell 8


pandoc 格式的表格

markdown 專案     | 特色   
--------------    | ------------------------------------------------------------------
showdown          | 較早開發的 markdown 轉換程式
pagedown          | 修改自 showdown，使用在 Stackoverflow 網站中的 markdown 轉換程式
marked            | 強調速度與彈性的 markdown 轉換程式 (支援的表格是 GFM 格式)
markx             | 與樣版引擎 jade 結合的 markdown 轉換程式

如何讓 node.js 的程式變成可直接執行的指令 -- <http://www.hacksparrow.com/commandline-node-js-scripts-utilities-modules.html>

## 參考文獻
* http://stackoverflow.com/questions/134235/is-there-any-good-markdown-javascript-library-or-control
    * Jquery-Markedit - This was forked from wmd-edit quite some time ago and refactored to use jQuery. Seems good at first sight.
    * EpicEditor - is also still maintained, has a flexible parser and, as you can see below, the author is highly responsive (see below). IT seems to have good documentation as well. Sadly not working with IE9.
    * MarkdownDeep is a third option that is still current. The interesting point with this one is support for Markdown Extra. Has a dependency on JQuery (actually you can also implement without JQuery). Based on the .NET version so documentation is more aligned to that than the JS version. This also works with IE9. It is very easy to use (with JQuery) & very simple. No significant development happening with this though as far as I can see.
    * js-markdown-extra is a fairly accurate port of the PHP library and is still under maintenance. It supports Markdown Extra of course.
* https://github.com/coreyti/showdown
* https://code.google.com/p/pagedown/
    * Stackoverflow 所使用的 markdown 轉 html 引擎。
    * <https://code.google.com/p/pagedown/wiki/PageDown>
* https://github.com/jgallen23/markx
    * <http://thechangelog.com/markx-convert-markdown-jade-and-more-to-static-html-with/>
* https://github.com/andris9/node-markdown
* https://github.com/chjj/marked
