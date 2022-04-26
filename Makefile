.POSIX:
.SUFFIXES:

SITE = localhost

all: site FORCE

dist: site.tar.gz FORCE

clean: FORCE
	rm -fr site.tar.gz site-min site

watch: FORCE
	{ python3 -m http.server --directory site & }; \
	python3=$$!; \
	trap "kill $$python3; exit 0" EXIT INT TERM; \
	find Makefile static templates | entr -d -- $(MAKE) clean all

site:
	export SITE=$(SITE); \
	cp -r static $@; \
	(cd templates; sh index.html.sh) >$@/index.html; \
	(cd templates; sh sitemap.xml.sh) >$@/sitemap.xml; \
	(cd templates; sh robots.txt.sh) >$@/robots.txt;

site.tar.gz: site
	cd $<; minify -arso ../$<-min/ .
	tar -C $<-min -czf $@ .

FORCE:
