// `WeakSet.from` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
require('../internals/export')({ target: 'WeakSet', stat: true }, {
  from: require('../internals/collection-from')
});
