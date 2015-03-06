HTML = $(patsubst %.wd,%.html,$(wildcard *.wd))
WD     = title.wd preface.wd editor.wd license.wd focus.wd focus2.wd focus3.wd focus4.wd article.wd article1.wd article2.wd article3.wd info.wd reflink.wd
HARG =  --data-dir=../ -c epub.css -B header.htm -A footer.htm --toc --base-header-level=1 --toc-depth=2

.PHONY: all

all: init htm shtm epub pdf end

init:
	echo $(HTML)
	
end:
	
shtm: init
	pandoc $(WD) $(HARG) -o book.html

epub: init
	pandoc --data-dir=../ $(WD) --toc --base-header-level=1 --toc-depth=2 --epub-metadata=epub.meta --epub-stylesheet=epub.css --epub-cover-image=cover.jpg -o book.epub

pdf: epub
	ebook-convert book.epub book.pdf --margin-top=16 --margin-bottom=16 --margin-left=20 --margin-right=20 --pretty-print --base-font-size=11 --font-size-mapping="10, 12, 14, 16, 20, 24, 28, 36" --output-profile=ipad3	
	
htm: init $(HTML)

%.html: %.wd
	pandoc $(HARG) $* reflink.md -o $@
	
clean: 
	

    
#%.md0 : 
#	node md0.js $*.md0 $*.md   
# md0: $(MD0)  
# $?�G�N���w�Q���s�� dependencies ���ȡC�]�N�O dependencies ���A�� targets �ٷs���ȡC
# $@�G�N�� targets ���ȡC
# $<�G�N���Ĥ@�� dependencies ���ȡC
# $* : �N�� targets �ҫ��w���ɮסA�����]�t���ɦW�C
