const { MultiMap } = require('../../dist/lib/dataStructures/multimap/MultiMap');

describe('Tests the count method on MultiMap', () => {
  const map = new MultiMap([ ['1', 2], ['3', 4], ['5', 6] ]);

  it('Should return 1', done => {
    expect(map.count('1')).toEqual(1);

    done();
  });

  it('Should return 2', done => {
    const map2 = new MultiMap([ ['7', 8], ['9', 10], ['11', 12], ['11', 13] ]);

    expect(map2.count('11')).toEqual(2);

    done();
  });
});
