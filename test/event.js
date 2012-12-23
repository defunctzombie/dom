var assert = require('assert');
var dom = require('../');

suite('events');

test('.on(name)', function(done) {
    var div = dom('<div></div>');

    div.on('click', function(ev) {
        assert(ev.target == div.els[0]);
        done();
    });

    div.emit('click');
});

test('.off(name)', function(done) {
    var div = dom('<div></div>');

    var count = 0;
    var handler1 = function() {
        assert(count++ == 0);

        div.off('click', handler1);
        div.emit('click');
        done();
    };

    div.on('click', handler1);
    div.emit('click');
});

test('.on(name, selector)', function(done) {
    var div = dom('<ul style="display:none"><li><a>foo</a></li><li>bar</li></ul>');

    // chrome needs this to bubble the event
    dom(document.body).append(div);

    div.on('click', 'li', function(ev) {
        // the target is the 'a' that caused trigger
        assert(ev.target == div.find('li a').els[0]);
        // the currentTarget is the selector element
        assert(ev.currentTarget == div.find('li').first().els[0]);
        done();
    });

    div.find('li a').first().emit('click', {
        bubbles: true
    });
});

