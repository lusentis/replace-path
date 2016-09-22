
// path:
// - dotted path notation
// - two consecutive dots specifies an array to iterate

const clone = require('clone');

function replacePathHelper (source, path, nextValue) {
  const tokens = path.split('.');
  const current = tokens[0];
  if (tokens.length > 1) {
    if (current === '') {
      // we are in an array to loop
      if (!Array.isArray(source)) {
        throw new Error('Cannot iterate over a non-array, at path', path);
      }
      source.forEach((element, index) => {
        replacePathHelper(source[index], tokens.slice(1).join('.'), nextValue);
      });
    } else {
      replacePathHelper(source[current], tokens.slice(1).join('.'), nextValue);
    }
  } else {
    source[current] = nextValue;
  }
  return source;
}

module.exports = function (source, path, nextValue) {
  return replacePathHelper(clone(source), path, nextValue);
};
