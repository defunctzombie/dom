
build: index.js components
	@component build --dev

components:
	@component install --dev

clean:
	rm -fr build components

test: build/build.js
	@zuul test/*.js --ui qunit

.PHONY: clean test
