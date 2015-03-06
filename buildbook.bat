IF "%1"==""  GOTO error

node makebook %1

cd db/%1

pandoc --data-dir=. -s --mathml book.md ../reflink.md -c ../epub.css -B ../header.htm -A ../footer.htm --toc --base-header-level=1 --toc-depth=2 -o book.html

pandoc --data-dir=. -s --mathml book.md ../reflink.md --toc --base-header-level=1 --toc-depth=2 --epub-metadata=../epub.meta --epub-stylesheet=../epub.css --epub-cover-image=cover.jpg -o book.epub

ebook-convert book.epub book.pdf --margin-top=16 --margin-bottom=16 --margin-left=20 --margin-right=20 --pretty-print --base-font-size=11 --font-size-mapping="10, 12, 14, 16, 20, 24, 28, 36" --output-profile=ipad3

cd ../../

:error
