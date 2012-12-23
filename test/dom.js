var assert = require('assert');
var dom = require('../');

suite('dom()');

// should return a list
test('selector', function() {
    var list = dom('<ul><li id="one">foo</li><li id="two">bar</li></ul>');
    list = dom('#two', list);
    assert(1 == list.length(), 'expected length of 1');
    assert('bar' == list.get(0).textContent);
});

test('html', function() {
    var list = dom('<em>Hello</em>');
    assert('Hello' == list.get(0).textContent);
});

test('self ref', function() {
    var list = dom('<p>Hello</p>');
    assert(list == dom(list));
});

test('wrap dom node', function() {
    var p = document.createElement('p');
    var list = dom(p);
    assert(p == list.get(0));
})

test('.length()', function() {
    var list = dom('<em>Hello</em>');
    assert(1 == list.length());
});

test('.clone()', function() {
    var a = dom('<p>Hello</p>');
    var b = a.clone();
    assert(a != b);
    assert('Hello' == b.text());
    assert(a.get(0) != b.get(0));
});

test('.get()', function() {
    var list = dom('<em>Hello</em>');
    assert('Hello' == list.get(0).textContent);
});

test('.at()', function() {
    var list = dom('<em>Hello</em>');
    assert('Hello' == list.at(0).get(0).textContent);
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
    assert(2 == list.length());
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
    assert(list.get(0) == values[0].get(0));
    assert(list.get(1) == values[1].get(0));
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
    assert(list.get(0) == values[0]);
    assert(list.get(1) == values[1]);
});

test('.map(fn)', function() {
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');

    var ret = list.map(function(el, i){
        return el.text();
    }).join('|');

    assert('foo|bar' == ret);
});

test('.filter(fn)', function() {
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');

    var selected = list.filter(function(el){
        return el.text() == 'bar';
    });

    assert(1 == selected.length(), 'invalid length');
    assert(selected.get(0) == list.get(1));
});

test('.attr(key, value)', function() {
    var list = dom('<a></a>');
    list.attr('href', '#');
    assert('#' == list.get(0).getAttribute('href'));
});

test('.attr(key)', function() {
    var list = dom('<div id="logo"></div>');
    assert('logo' == list.attr('id'));
});

dom.attrs.forEach(function(name){
    test('.' + name + '()', function() {
        var list = dom('<a></a>');
        list.attr(name, 'tobi');
        assert('tobi' == list[name]());
    });

    test('.' + name + '(value)', function() {
        var list = dom('<a></a>');
        list[name]('tobi');
        assert('tobi' == list[name]());
    });
});
