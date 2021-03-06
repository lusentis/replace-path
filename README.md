# replace-path

Replaces nested values in an object.

[![Build Status](https://travis-ci.org/lusentis/replace-path.svg?branch=master)](https://travis-ci.org/lusentis/replace-path)
[![Coverage Status](https://coveralls.io/repos/github/lusentis/replace-path/badge.svg?branch=master)](https://coveralls.io/github/lusentis/replace-path?branch=master)
[![dependencies Status](https://david-dm.org/lusentis/replace-path/status.svg)](https://david-dm.org/lusentis/replace-path) 
[![devDependencies Status](https://david-dm.org/lusentis/replace-path/dev-status.svg)](https://david-dm.org/lusentis/replace-path?type=dev)

[![](https://nodei.co/npm/replace-path.png?compact=true)]()

#### Examples:

```js
var source = {
  a: '123',
  b: {
    m: '456',
    n: '789'
  },
  d: [{
    x: 'aaa',
    y: 'z'
  }, {
    x: 'bbb',
    y: 'w'
  }]
};
var next1 = replacePath(source, 'a', 'BAR');
var next2 = replacePath(source, 'b.n', 'BAR');
var next3 = replacePath(source, 'd..x', 'BAR');
var next4 = replacePath(source, 'd.1.x', 'BAR');
var next5 = replacePath(source, 'd..x', (source, key, oldValue) => {
  source[key + 'Bar'] = oldValue.toUpperCase();
});
```

Check [index.spec.js](index.spec.js) for detailed usage.

#### License

See `LICENSE.md`
