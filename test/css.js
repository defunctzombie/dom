var assert = require('assert');
var dom = require('../');

suite('css');

test('.addClass()', function() {
    var list = dom('<em>Hello</em>');
    list.addClass('foo').addClass('bar');
    assert('foo bar' == list[0].className);
});

test('.removeClass()', function() {
    var list = dom('<em>Hello</em>');
    list.addClass('foo').addClass('bar').removeClass('foo');
    assert('bar' == list[0].className);
});

test('.toggleClass()', function() {
    var list = dom('<em>Hello</em>');

    list.toggleClass('show');
    assert('show' == list[0].className);

    list.toggleClass('show');
    assert('' == list[0].className);
});

test('.hasClass()', function() {
    var list = dom('<em>Hello</em>').addClass('show');
    assert(true === list.hasClass('show'));

    var list = dom('<em>Hello</em>').addClass('show');
    assert(false === list.hasClass('hide'));
});

test('.css(key, value)', function() {
    var list = dom('<em>Hello</em>');
    list.css('display', 'none');
    assert('none' == list[0].style.display);
});

test('.css(key)', function() {
    var list = dom('<em>Hello</em>');
    list.css('display', 'none');
    assert('none' == list.css('display'));
});

test('.css(obj)', function() {
    var list = dom('<em>Hello</em>');
    list.css({
        'display': 'none',
        'position': 'absolute'
    });
    assert('none' == list[0].style.display);
    assert('absolute' == list[0].style.position);
});

test('.hide()', function() {
    var div = dom('<div></div>');
    div.hide();
    assert('none' == div[0].style.display);
});

test('.show()', function() {
    var div = dom('<div style="display:none"></div>');
    div.show();
    assert('block' == div[0].style.display);
});

test('.show() - preserve previous', function() {
    var div = dom('<div style="display:table"></div>');
    div.hide();
    assert('none' == div[0].style.display);
    div.show();
    assert('table' == div[0].style.display);
});

