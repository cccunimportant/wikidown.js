#!/bin/bash
# My first script

set -x

md="../title ../preface editor ../license ../focus focus2 focus3 ../people people1 people2 people4 ../article article1 ../info ../reflink"

if [ ! -d "book" ]; then
  mkdir book
fi

cp md/* book
cp img/*.* book

cd book

pandoc --data-dir=../ $md  -c ../epub.css -B ../header.htm -A ../footer.htm --toc --base-header-level=1 --toc-depth=2 -o book.html

pandoc --data-dir=../ $md --toc --base-header-level=1 --toc-depth=2 --epub-metadata=../epub.meta --epub-stylesheet=../epub.css --epub-cover-image=cover.jpg -o book.epub

ebook-convert  book.epub book.pdf --margin-top=16 --margin-bottom=16 --margin-left=20 --margin-right=20 --pretty-print --base-font-size=11 --font-size-mapping="10, 12, 14, 16, 20, 24, 28, 36" --output-profile=ipad3

cd ..

set +x
