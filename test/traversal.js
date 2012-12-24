var assert = require('assert');
var dom = require('..');

test('.next()', function() {
    var d = dom('<ul><li>foo</li><li>bar</li></ul>');

    assert.equal(d.find('li').first().text(), 'foo');
    assert.equal(d.find('li').first().next().text(), 'bar');

    // when no more elements, should return list with length 0
    assert.equal(d.find('li').last().next().length(), 0);
});

test('.prev()', function() {
    var d = dom('<ul><li>foo</li><li>bar</li></ul>');

    assert.equal(d.find('li').last().text(), 'bar');
    assert.equal(d.find('li').last().prev().text(), 'foo');

    // when no more elements, should return list with length 0
    assert.equal(d.find('li').first().prev().length(), 0);
});
