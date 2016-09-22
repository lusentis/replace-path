
const tap = require('tap');
const deepFreeze = require('deep-freeze');
const replacePath = require('./');

const source = {
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
deepFreeze(source);

tap.test('replaces at one level deep', t => {
  const actual = replacePath(source, 'a', 'BAR');
  const expected = {
    a: 'BAR',
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
  t.deepEqual(actual, expected);
  t.end();
});

tap.test('replaces a nested path', t => {
  const actual = replacePath(source, 'b.n', 'BAR');
  const expected = {
    a: '123',
    b: {
      m: '456',
      n: 'BAR'
    },
    d: [{
      x: 'aaa',
      y: 'z'
    }, {
      x: 'bbb',
      y: 'w'
    }]
  };
  t.deepEqual(actual, expected);
  t.end();
});

tap.test('replaces all paths in an array', t => {
  const actual = replacePath(source, 'd..x', 'BAR');
  const expected = {
    a: '123',
    b: {
      m: '456',
      n: '789'
    },
    d: [{
      x: 'BAR',
      y: 'z'
    }, {
      x: 'BAR',
      y: 'w'
    }]
  };
  t.deepEqual(actual, expected);
  t.end();
});

tap.test('replaces a path in an array', t => {
  const actual = replacePath(source, 'd.1.x', 'BAR');
  const expected = {
    a: '123',
    b: {
      m: '456',
      n: '789'
    },
    d: [{
      x: 'aaa',
      y: 'z'
    }, {
      x: 'BAR',
      y: 'w'
    }]
  };
  t.deepEqual(actual, expected);
  t.end();
});

tap.test('replaces all paths in an array, using a replacer function', t => {
  const replacerFn = (source, key, oldValue) => {
    source[key + 'Bar'] = oldValue.toUpperCase();
  };
  const actual = replacePath(source, 'd..x', replacerFn);
  const expected = {
    a: '123',
    b: {
      m: '456',
      n: '789'
    },
    d: [{
      x: 'aaa',
      xBar: 'AAA',
      y: 'z'
    }, {
      x: 'bbb',
      xBar: 'BBB',
      y: 'w'
    }]
  };
  t.deepEqual(actual, expected);
  t.end();
});

tap.test('throws if trying to replace an unknown prop', t => {
  t.throws(() => replacePath(source, 'a.nonexistant.bbb.x', '3rr0r'));
  t.end();
});

tap.test('throws if trying to iterate a non Array', t => {
  t.throws(() => replacePath(source, 'a..x', '3rr0r'));
  t.end();
});
