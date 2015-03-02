HTML = $(patsubst md/%,%.html,$(wildcard md/*))
MD     = ../title ../preface editor license ../focus focus2 focus3 ../people people1 people2 people4 ../article article1 info ../reflink
HARG =  --data-dir=../ -c ../epub.css -B ../header.htm -A ../footer.htm --toc --base-header-level=1 --toc-depth=2

.PHONY: all

all: init htm shtm epub pdf end

init:
	cp md/* book
	cp img/*.* book
	echo $(HTML)
	
end:
	
shtm: init
	cd book; pandoc $(MD) $(HARG) -o book.html

epub: init
	cd book; pandoc --data-dir=../ $(MD) --toc --base-header-level=1 --toc-depth=2 --epub-metadata=../epub.meta --epub-stylesheet=../epub.css --epub-cover-image=cover.jpg -o book.epub

pdf: epub
	cd book; ebook-convert  book.epub book.pdf --margin-top=16 --margin-bottom=16 --margin-left=20 --margin-right=20 --pretty-print --base-font-size=11 --font-size-mapping="10, 12, 14, 16, 20, 24, 28, 36" --output-profile=ipad3	
	
htm: init $(HTML)

%.html:
	cd book; pandoc $(HARG) $* ../reflink -o $@
	
clean: 
	rm book/*.*

    
#%.md0 : 
#	node md0.js $*.md0 $*.md   
# md0: $(MD0)  
# $?：代表已被更新的 dependencies 的值。也就是 dependencies 中，比 targets 還新的值。
# $@：代表 targets 的值。
# $<：代表第一個 dependencies 的值。
# $* : 代表 targets 所指定的檔案，但不包含副檔名。