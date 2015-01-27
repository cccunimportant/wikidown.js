var titleCcc  = '<a class="navbar-brand" href="#ccc:home">陳鍾誠</a>';
var titleBook  = '<a class="navbar-brand" href="#book:home">教科書</a>';
var titlePmag = '<a class="navbar-brand" href="#pmag:home">程式人雜誌</a>';
var titleYmag = '<a class="navbar-brand" href="#ymag:home">少年科技人雜誌</a>';

var title={
	ccc:titleCcc,
	book:titleCcc+titleBook,
	js:titleCcc+titleBook+'<a class="navbar-brand" href="#js:home">JavaScript 語言基礎</a>',
	novel:titleCcc+'<a class="navbar-brand" href="#novel:home">小說</a>',
	wp:titleCcc+titleBook+'<a class="navbar-brand" href="#wp:home">Web程式設計</a>',
	wikidown:'<a class="navbar-brand" href="#wikidown:home">Wikidown</a>',
	pmag:titlePmag,
	pmag201503:titlePmag+'<a class="navbar-brand" href="#pmag201503:home">2015年3月號</a>',
	ymag:titleYmag,
	ymag201502:titleYmag+'<a class="navbar-brand" href="#ymag201502:home">2015年2月號</a>'
};

var templatePmag='%md%\n\n----\n\n\
<center style="font-size:small;color:#888888">本雜誌部份內容修改自 [維基百科] ， 使用時請遵守 [姓名標示、相同方式分享] 授權。<br/> 雜誌編輯：  [陳鍾誠](#ccc:home)  email: <ccckmit@gmail.com> </center>\n\
[程式人雜誌社團]: https://www.facebook.com/groups/programmerMagazine/\n\
[少年科技人社團]: https://www.facebook.com/groups/youngmaker.magazine/\n\
[少年科技人雜誌]: http://programmermagazine.github.io/youngmaker/\n\
[程式人雜誌]: http://programmermagazine.github.com/home/\n\
[姓名標示、相同方式分享]: http://creativecommons.org/licenses/by-sa/3.0/tw/\n\
[姓名標示、非商業性、相同方式分享]: http://creativecommons.org/licenses/by-nc-sa/3.0/tw/\n\
[陳鍾誠]: http://ccckmit.wikidot.com/\n\
[維基百科]:http://zh.wikipedia.org/\n';

var template={
	wikidown:'%md%',
	pmag:templatePmag,
	pmag201503:templatePmag,
	ymag:templatePmag,
	ymag201502:templatePmag,
	ccc:templatePmag
};

/*
var config={
append: pmag_template
};
*/