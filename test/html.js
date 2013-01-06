var assert = require('assert');
var dom = require('../');

suite('.html');

test('.html(str)', function() {
    var div = dom('<div>');

    // setting html should work
    div.html('<p>foo</p>');
    assert.equal(div.html(), '<p>foo</p>');

    // make sure that we can find in new html
    assert.equal(div.find('p').text(), 'foo');
});

test('.html(str) - override', function() {
    var div = dom('<div><p>foo</div>');

    // override old html
    div.html('bar');
    assert.equal(div.html(), 'bar');
    assert.equal(div.text(), 'bar');
});

