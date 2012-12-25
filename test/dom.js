var assert = require('assert');
var dom = require('../');

suite('dom()');

// should return a list
test('selector', function() {
    var list = dom('<ul><li id="one">foo</li><li id="two">bar</li></ul>');
    list = dom('#two', list);
    assert(1 == list.length);
    assert('bar' == list[0].textContent);
});

test('trim selector', function() {
    var list = dom('  <ul><li id="one"> foo </li></ul>  ');
    assert(1 == list.length);

    var li = list.find('  #one ');
    assert(1 == li.length);
    assert(' foo ' == li.text());
});

test('html', function() {
    var list = dom('<em>Hello</em>');
    assert('Hello' == list[0].textContent);
});

test('multiple html', function() {
    var list = dom('<em>Hello</em><em>World</em>');
    assert.equal(2, list.length);
    assert('Hello' == list[0].textContent);
    assert('World' == list[1].textContent);
});

/// create a td element
/// tested to make sure an element is created wrapped if needed
test('html - td', function() {
    var list = dom('<td>');
    assert.equal(list.length, 1);
    assert.equal(list[0].outerHTML, '<td></td>');
});

test('self ref', function() {
    var list = dom('<p>Hello</p>');
    assert(list == dom(list));
});

test('wrap dom node', function() {
    var p = document.createElement('p');
    var list = dom(p);
    assert(p == list[0]);
})

test('.length', function() {
    var list = dom('<em>Hello</em>');
    assert(1 == list.length);
});

test('.clone()', function() {
    var a = dom('<p>Hello</p>');
    var b = a.clone();
    assert(a != b);
    assert('Hello' == b.text());
    assert(a[0] != b[0]);
});

test('[N]', function() {
    var list = dom('<em>Hello</em>');
    assert('Hello' == list[0].textContent);
});

test('.at()', function() {
    var list = dom('<em>Hello</em>');
    assert('Hello' == list.at(0)[0].textContent);
});

test('.first()', function() {
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');
    assert('foo' == list.first().text());
});

test('.last()', function() {
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');
    assert('bar' == list.last().text());
});

test('.find(selector)', function() {
    var list = dom('<ul><li>foo</li><li>bar</li></ul>');
    list = list.find('li');
    assert(2 == list.length);
});

test('.each(fn)', function() {
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');

    var indexes = [];
    var values = [];
    var ret = list.each(function(el, i){
        indexes.push(i);
        values.push(el);
    });

    assert(ret == list, 'should return self for chaining');
    assert(0 == indexes[0]);
    assert(1 == indexes[1]);
    assert(values[0] instanceof dom.List, 'values should be dom lists');
    assert(list[0] == values[0][0]);
    assert(list[1] == values[1][0]);
});

test('.forEach(fn)', function() {
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');

    var indexes = [];
    var values = [];
    var ret = list.forEach(function(el, i){
        indexes.push(i);
        values.push(el);
    });

    assert(ret == list, 'should return self for chaining');
    assert(0 == indexes[0]);
    assert(1 == indexes[1]);
    assert(!(values[0] instanceof dom.List), 'values should be elements');
    assert(list[0] == values[0]);
    assert(list[1] == values[1]);
});

test('.map(fn)', function() {
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');

    var ret = list.map(function(el, i){
        return dom(el).text();
    }).join('|');

    assert('foo|bar' == ret);
});

test('.filter(fn)', function() {
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');

    var selected = list.filter(function(el){
        return el.text() == 'bar';
    });

    assert(1 == selected.length, 'invalid length');
    assert(selected[0] == list[1]);
});

test('.attr(key, value)', function() {
    var list = dom('<a></a>');
    list.attr('href', '#');
    assert('#' == list[0].getAttribute('href'));
});

test('.attr(key)', function() {
    var list = dom('<div id="logo"></div>');
    assert('logo' == list.attr('id'));
});

