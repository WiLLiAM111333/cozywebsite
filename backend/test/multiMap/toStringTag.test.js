const { MultiMap } = require('../../dist/lib/dataStructures/multimap/MultiMap');

describe('Tests the toStringTag property of Symbol on the class', () => {
  const map = new MultiMap([ ['1', 2], ['3', 4] ]);

  it('Should return [object \'MultiMap\']', done => {
    expect(map.toString()).toEqual('[object MultiMap]');

    done();
  });

  it('Should return \'MultiMap\'', done => {
    expect(map[Symbol.toStringTag]).toEqual('MultiMap');

    done();
  });
});
