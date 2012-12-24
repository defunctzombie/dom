var assert = require('assert');
var dom = require('../');

suite('dimensions - height');

var h1 = dom('<div style="height:1px; border:1px solid; padding:1px; margin:1px"></div>');
var h2 = dom('<div>');

// box sized div
var h3 = dom('<div style="height:10px; border:1px solid; padding:1px; -mox-box-sizing:border-box; --webkit-box-sizing:border-box; box-sizing:border-box"></div>');

var h4 = dom('<div style="height:5px">');

test('setup', function() {
    // need to append to document to get height
    dom(document.body).append(h1);

    // two elements in a div
    dom(document.body).append(h2);
    h2.append(h1.clone()).append(h1.clone());

    dom(document.body).append(h3);

    var d = dom('<div style="height:20px">');
    h4.append(d.clone()).append(d.clone());
    dom(document.body).append(h4);
});

test('.outerHeight()', function() {
    assert.equal(h1.outerHeight(), 5);
    assert.equal(h2.outerHeight(), 11);
    assert.equal(h3.outerHeight(), 10);
    assert.equal(h4.outerHeight(), 5);
});

test('.innerHeight()', function() {
    assert.equal(h1.innerHeight(), 3);
    assert.equal(h2.innerHeight(), 11);

    // border box sizing should cause border and padding to cut into inner height
    // need to append to document to get height
    assert.equal(h3.innerHeight(), 8);

    assert.equal(h4.innerHeight(), 5);
});

test('.contentHeight()', function() {
    assert.equal(h1.contentHeight(), 1);
    assert.equal(h2.contentHeight(), 11);
    assert.equal(h3.contentHeight(), 6);
    assert.equal(h4.contentHeight(), 5);
});

test('.scrollHeight()', function() {
    assert.equal(h4.scrollHeight(), 40);
});

suite('dimensions - width');
