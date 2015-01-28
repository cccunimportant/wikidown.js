# PANDOC = pandoc -s --mathml 
PANDOC = pandoc -s --webtex 
MD0 = $(patsubst %.md0,%.md,$(wildcard *.md0))
HTML = $(patsubst %.md,%.html,$(wildcard *.md)) $(patsubst %.md0,%.html,$(wildcard *.md0))
MD   = title preface editor license focus focus2 focus3 people people1 people2 people4 article article1 info reflink
PEPUB = --toc --base-header-level=1 --toc-depth=2 --epub-metadata=metadata.xml --epub-stylesheet=../css/epub.css 
EARG = --margin-top=16 --margin-bottom=16 --margin-left=20 --margin-right=20 --pretty-print --base-font-size=11 --font-size-mapping="10, 12, 14, 16, 20, 24, 28, 36" 
RM = rm -f

.PHONY: all

all: epub pdf

epub: $(MD0)
	$(PANDOC) $(PEPUB) --epub-cover-image=cover.jpg $(MD) -o ../book/book.epub

pdf: epub
	ebook-convert ../book/book.epub ../book/book.pdf $(EARG) --output-profile=ipad3
	
clean: 
	${RM} ../htm/*.*
	${RM} ../book/*.*
	${RM} $(MD0)

    
#%.md0 : 
#	node md0.js $*.md0 $*.md   
# md0: $(MD0)  
# $?：代表已被更新的 dependencies 的值。也就是 dependencies 中，比 targets 還新的值。
# $@：代表 targets 的值。
# $<：代表第一個 dependencies 的值。
# $* : 代表 targets 所指定的檔案，但不包含副檔名。