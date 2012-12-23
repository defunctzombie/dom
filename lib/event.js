
/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
*/

exports.bind = function(el, type, fn, capture) {
    if (el.addEventListener) {
        el.addEventListener(type, fn, capture);
    } else {
        el.attachEvent('on' + type, fn);
    }
    return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
*/

exports.unbind = function(el, type, fn, capture){
    if (el.removeEventListener) {
        el.removeEventListener(type, fn, capture);
    } else {
        el.detachEvent('on' + type, fn);
    }
    return fn;
};

exports.emit = function(el, name, opts) {
    opts = opts || {};
    var type = typeOf(name);

    var ev = document.createEvent(type + 's');
    var init = typeof ev['init' + type] === 'function'
    ? 'init' + type : 'initEvent';

    var sig = initSignatures[init];
    var args = [];
    var used = {};

    opts.type = name;

    for (var i = 0; i < sig.length; i++) {
        var key = sig[i];
        args.push(opts[key]);
    }
    ev[init].apply(ev, args);

    // attach remaining unused options to the object
    for (var key in opts) {
        if (!used[key]) ev[key] = opts[key];
    }

    return el.dispatchEvent(ev);
};

var initSignatures = require('./init.json');
var types = require('./types.json');
var typeOf = (function () {
    var typs = {};
    for (var key in types) {
        var ts = types[key];
        for (var i = 0; i < ts.length; i++) {
            typs[ts[i]] = key;
        }
    }

    return function (name) {
        return typs[name] || 'Event';
    };
})();
