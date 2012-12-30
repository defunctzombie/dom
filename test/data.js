var assert = require('assert');
var dom = require('../');

suite('data');

test('.data(key, value)', function() {
    var list = dom('<div>');
    list.data('foo', 'bar');

    assert.equal(list[0].getAttribute('data-foo'), 'bar');
    assert.equal(list.data('foo'), 'bar');
});
