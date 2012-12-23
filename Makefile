
build: index.js components
	@component build --dev

components:
	@component install --dev

clean:
	rm -fr build components

test-watch:
	browserify test/*.js -o build/build.js --watch --debug

test: build/build.js
	@mocha-phantomjs -R dot test/index.html

build/build.js: index.js lib/*.js
	browserify test/*.js -o build/build.js

.PHONY: clean test
