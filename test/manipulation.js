var assert = require('assert');
var dom = require('../');

suite('.prepend');

test('chaining', function() {
    var list = dom('<div></div>');
    assert(list == list.prepend('<p></p>'));
});

test('prepend', function() {
    var list = dom('<div></div>');
    list.prepend('<p>One</p>');
    assert('<p>One</p>' == list.html());

    list.prepend(dom('<p>Two</p>'));
    assert('<p>Two</p><p>One</p>' == list.html());

    list.prepend(dom('<p>Three</p>'));
    assert('<p>Three</p><p>Two</p><p>One</p>' == list.html());
});

suite('.append');

test('chaining', function() {
    var list = dom('<div></div>');
    assert(list == list.append('<p></p>'));
});

test('append', function() {
    var list = dom('<div></div>');
    list.append('<p>One</p>');
    assert('<p>One</p>' == list.html());

    list.append(dom('<p>Two</p>'));
    assert('<p>One</p><p>Two</p>' == list.html());
});
