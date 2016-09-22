
const test = require('tape');
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

test('replaces at one level deep', t => {
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

test('replaces a nested path', t => {
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

test('replaces all paths in an array', t => {
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

test('replaces a path in an array', t => {
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

test('replaces all paths in an array, using a replacer function', t => {
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
