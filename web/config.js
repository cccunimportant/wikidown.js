var titleCcc  = ' [[陳鍾誠]](ccc:home) ';
var titleBook  = ' / [[教科書]](book:home) ';
var titlePmag = ' [[程式人雜誌]](pmag:home) ';
var titleYmag = ' [[少年科技人雜誌]](ymag:home) ';

var title={
	ccc:titleCcc,
	book:titleCcc+titleBook,
	js:titleCcc+titleBook+' / [[JavaScript 語言基礎]](js:home) ',
	novel:titleCcc+' / [[小說]](novel:home) ',
	wp:titleCcc+titleBook+' / [[Web程式設計]](wp:home) ',
	wikidown:' [[Wikidown]](wikidown:home) ',
	pmag:titlePmag,
	pmag201503:titlePmag+' / [[2015年3月號]](pmag201503:home) ',
	ymag:titleYmag,
	ymag201502:titleYmag+' / [[2015年2月號]](ymag201502:home) ',
	ss:titleCcc+titleBook+' / [[系統軟體]](ss:home) ',
	blender:titleCcc+titleBook+' / [[Blender動畫設計]](blender:home) ',
	co:titleCcc+titleBook+' / [[計算機結構]](co:home) ',
	ai:titleCcc+titleBook+' / [[人工智慧]](ai:home) ',
	ct:titleCcc+titleBook+' / [[計算理論]](ct:home) ',
	st:titleCcc+titleBook+' / [[機率統計]](st:home) '
};

var templatePmag='<%=wd%>\n\n----\n\n\
<center style="font-size:small;color:#888888">本文部份內容修改自 [維基百科] ， 使用時請遵守 [姓名標示、相同方式分享] 授權。<br/> 雜誌編輯：  [陳鍾誠](#ccc:home)  email: <ccckmit@gmail.com> </center>\n\
[程式人雜誌社團]: https://www.facebook.com/groups/programmerMagazine/\n\
[少年科技人社團]: https://www.facebook.com/groups/youngmaker.magazine/\n\
[少年科技人雜誌]: http://programmermagazine.github.io/youngmaker/\n\
[程式人雜誌]: http://programmermagazine.github.io/home/\n\
[姓名標示、相同方式分享]: http://creativecommons.org/licenses/by-sa/3.0/tw/\n\
[姓名標示、非商業性、相同方式分享]: http://creativecommons.org/licenses/by-nc-sa/3.0/tw/\n\
[陳鍾誠]: http://ccckmit.wikidot.com/\n\
[維基百科]:http://zh.wikipedia.org/\n';

var template={
	wikidown:templatePmag,
	pmag:templatePmag,
	pmag201503:templatePmag,
	ymag:templatePmag,
	ymag201502:templatePmag,
	ai:templatePmag,
	blender:templatePmag,
	co:templatePmag,
	ss:templatePmag,
	st:templatePmag,
	ct:templatePmag,
	ccc:templatePmag
};

var config = {
  title: title,
  template: template
}

if (typeof module !== 'undefined') 
  module.exports = config;
