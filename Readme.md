# dom

DOM traversal / manipulation library

## Installation

```
$ npm install dom
```

## Example

```js
var dom = require('dom');

dom('li').filter(function(el) {
  return el.text() == 'Maru';
}).addClass('amazing');
```

## API

   - [dom(id)](#domid)
   - [dom(html)](#domhtml)
   - [.length()](#length)
   - [.get(i)](#geti)
   - [.at(i)](#ati)
   - [.first()](#first)
   - [.last()](#last)
   - [.find(selector)](#findselector)

### css
   - [.addClass(name)](#addclassname)
   - [.removeClass(name)](#removeclassname)
   - [.toggleClass(name)](#toggleclassname)
   - [.hasClass(name)](#hasclassname)
   - [.css(prop, value)](#cssprop-value)
   - [.css(prop)](#cssprop)
   - .hide()
   - .show()

### manipulation
   - .append(element)
   - .prepend(element)
   - .html(source)

### iteration
   - [.each(fn)](#eachfn)
   - [.forEach(fn)](#foreachfn)
   - [.map(fn)](#mapfn)
   - [.filter(fn)](#filterfn)

<a name="domid"></a>
### dom(id)
should return an element by id.

```js
var list = dom('<ul><li id="one">foo</li><li id="two">bar</li></ul>');
list = dom('#two', list);
assert(1 == list.length(), 'expected length of 1');
assert('bar' == list.get(0).textContent);
```

<a name="domhtml"></a>
### dom(html)
should return a dom List of elements.

```js
var list = dom('<em>Hello</em>');
assert('Hello' == list.get(0).textContent);
```

<a name="length"></a>
### .length()
should return the number of elements.

```js
var list = dom('<em>Hello</em>');
assert(1 == list.length());
```

<a name="geti"></a>
### .get(i)
should return the element at i.

```js
var list = dom('<em>Hello</em>');
assert('Hello' == list.get(0).textContent);
```

<a name="ati"></a>
### .at(i)
should return the element at i as a List.

```js
var list = dom('<em>Hello</em>');
assert('Hello' == list.at(0).get(0).textContent);
```

<a name="first"></a>
### .first()
should return the first element in the List.

```js
var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');
assert('foo' == list.first().text());
```

<a name="last"></a>
### .last()
should return the last element in the List.

```js
var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');
assert('bar' == list.last().text());
```

<a name="addclassname"></a>
### .addClass(name)
should add the given class name.

```js
var list = dom('<em>Hello</em>');
list.addClass('foo').addClass('bar');
assert('foo bar' == list.get(0).className);
```

<a name="removeclassname"></a>
### .removeClass(name)
should remove the given class name.

```js
var list = dom('<em>Hello</em>');
list.addClass('foo').addClass('bar').removeClass('foo');
assert('bar' == list.get(0).className);
```

<a name="toggleclassname"></a>
### .toggleClass(name)
should toggle the given class name.

```js
var list = dom('<em>Hello</em>');

list.toggleClass('show');
assert('show' == list.get(0).className);

list.toggleClass('show');
assert('' == list.get(0).className);
```

<a name="hasclassname"></a>
### .hasClass(name)
should return true when the classname is present.

```js
var list = dom('<em>Hello</em>').addClass('show');
assert(true === list.hasClass('show'));
```

should return false when the classname is not present.

```js
var list = dom('<em>Hello</em>').addClass('show');
assert(false === list.hasClass('hide'));
```

<a name="findselector"></a>
### .find(selector)
should return descendants matching the selector.

```js
var list = dom('<ul><li>foo</li><li>bar</li></ul>');
list = list.find('li');
assert(2 == list.length());
```

<a name="eachfn"></a>
### .each(fn)
should iterate passing (list, i).

```js
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
```

<a name="foreachfn"></a>
### .forEach(fn)
should iterate passing (el, i).

```js
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
```

<a name="mapfn"></a>
### .map(fn)
should map passing (list, i).

```js
var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');

var ret = list.map(function(el, i){
  return el.text();
}).join('|');

assert('foo|bar' == ret);
```

<a name="selectfn"></a>
### .select(fn)
should filter passing (list, i).

```js
var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');

var selected = list.select(function(el){
  return el.text() == 'bar';
});

assert(1 == selected.length(), 'invalid length');
assert(selected.get(0) == list.get(1));
```

<a name="filterfn"></a>
### .filter(fn)
should alias .select.

```js
assert(dom.List.prototype.filter == dom.List.prototype.select);
```

<a name="cssprop-value"></a>
### .css(prop, value)
should set a style value.

```js
var list = dom('<em>Hello</em>');
list.css('display', 'none');
assert('none' == list.get(0).style.display);
```

<a name="cssprop"></a>
### .css(prop)
should get a style value.

```js
var list = dom('<em>Hello</em>');
list.css('display', 'none');
assert('none' == list.css('display'));
```

## Notes

  It is recommended that you do _not_ depend on this library directly
  when creating public components, unless you require most or all of
  the functionality provided. Otherwise it is preferred that you use
  the smaller more specific components.

  This lib will not include _any_ XHR support, that is out of scope,
  this library is for DOM manipulation, traversal, and events only.

## License 

  MIT
