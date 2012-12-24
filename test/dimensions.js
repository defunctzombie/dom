var assert = require('assert');
var dom = require('../');

suite('dimensions - height');

var h1 = dom('<div style="height:1px; border:1px solid; padding:1px; margin:1px">');
var h2 = dom('<div>');

// box sized div
var h3 = dom('<div style="height:10px; border:1px solid; padding:1px; -moz-box-sizing:border-box; -webkit-box-sizing:border-box; box-sizing:border-box">');

var h4 = dom('<div style="height:5px; overflow:hidden">');

test('setup', function() {

    var outer = dom(document.body);

    // need to append to document to get height
    outer.append(h1);

    // two elements in a div
    dom(document.body).append(h2);
    h2.append(h1.clone()).append(h1.clone());

    outer.append(h3);

    var d = dom('<div style="height:20px">');
    h4.append(d.clone()).append(d.clone());
    outer.append(h4);
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

var w1 = dom('<div style="display:inline-block; width:1px; border:1px solid; padding:1px; margin:1px">');
var w2 = dom('<div style="display:inline-block">');

// box sized div
var w3 = dom('<div style="display:inline-block;width:10px; border:1px solid; padding:1px; -moz-box-sizing:border-box; -webkit-box-sizing:border-box; box-sizing:border-box">');

var w4 = dom('<div style="display:inline-block;width:5px;overflow:hidden">');

test('setup', function() {
    // need to append to document to get height
    dom(document.body).append(w1);

    // two elements in a div
    dom(document.body).append(w2);
    w2.append(w1.clone()).append(w1.clone());

    dom(document.body).append(w3);

    var d = dom('<div style="display:inline-block; width:20px">');
    w4.append(d.clone());
    dom(document.body).append(w4);
});

test('.outerWidth()', function() {
    assert.equal(w1.outerWidth(), 5);
    assert.equal(w2.outerWidth(), 14);
    assert.equal(w3.outerWidth(), 10);
    assert.equal(w4.outerWidth(), 5);
});

test('.innerWidth()', function() {
    assert.equal(w1.innerWidth(), 3);
    assert.equal(w2.innerWidth(), 14);
    assert.equal(w3.innerWidth(), 8);
    assert.equal(w4.innerWidth(), 5);
});

test('.contentWidth()', function() {
    assert.equal(w1.contentWidth(), 1);
    assert.equal(w2.contentWidth(), 14);
    assert.equal(w3.contentWidth(), 6);
    assert.equal(w4.contentWidth(), 5);
});

test('.scrollWidth()', function() {
    assert.equal(w4.scrollWidth(), 20);
});

