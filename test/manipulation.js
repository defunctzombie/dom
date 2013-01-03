var assert = require('assert');
var dom = require('../');

suite('.prepend');

test('chaining', function() {
    var list = dom('<div></div>');
    assert.equal(list, list.prepend('<p></p>'));
});

test('prepend', function() {
    var list = dom('<div></div>');
    list.prepend('<p>One</p>');
    assert.equal('<p>One</p>', list.html());

    list.prepend(dom('<p>Two</p>'));
    assert.equal('<p>Two</p><p>One</p>', list.html());

    list.prepend(dom('<p>Three</p>'));
    assert.equal('<p>Three</p><p>Two</p><p>One</p>', list.html());
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

suite('.before');

test('before', function() {
    var list = dom('<div><p>foo</p></div>');
    list.find('p').before('<p>bar</p>');
    assert.equal('<p>bar</p><p>foo</p>', list.html());
});

suite('.after');

test('after', function() {
    var list = dom('<div><p>foo</p></div>');
    list.find('p').after('<p>bar</p>');
    assert.equal('<p>foo</p><p>bar</p>', list.html());
});

suite('.remove');

test('remove', function() {
    var list = dom('<div><p>foo</p></div>');
    list.find('p').remove();
    assert.equal('', list.html());
});

suite('.replace');

test('replace', function() {
    var list = dom('<div><p>foo</p></div>');
    list.find('p').replace('<p>bar</p><p>baz</p>');
    assert.equal('<p>bar</p><p>baz</p>', list.html());
});

// replacing exist should return original
test('replace save', function() {
    var p = dom('<p>foo</p>');
    var div = dom('<div>').append(p);

    var old_p = p.replace('<p>bar</p>');
    assert.equal(p[0], old_p[0]);
});

suite('.empty');

test('empty', function() {
    var div = dom('<div><p>foo</p></div>');
    var p = div.find('p');

    assert.equal('<p>foo</p>', div.html());
    div.empty();
    assert.equal('', div.html());
});

