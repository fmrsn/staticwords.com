.POSIX:
.SUFFIXES:

SITE = localhost

all: site FORCE

dist: site.tar.gz FORCE

watch: FORCE
	{ python3 -m http.server --directory site & }; \
	python3=$$!; \
	trap "kill $$python3; exit 0" EXIT INT TERM; \
	find Makefile static templates | entr -d -- $(MAKE) clean all

clean: FORCE
	rm -fr site.tar.gz site-min site

site:
	cp -r static $@
	SITE=$(SITE) sh -eu templates/index.html.sh >$@/index.html
	SITE=$(SITE) sh -eu templates/sitemap.xml.sh >$@/sitemap.xml
	SITE=$(SITE) sh -eu templates/robots.txt.sh >$@/robots.txt

site.tar.gz: site
	cd $<; minify -arso ../$<-min/ .
	tar -C $<-min -czf $@ .

FORCE:
