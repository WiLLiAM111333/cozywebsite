const { MultiMap } = require('../../dist/lib/dataStructures/multimap/MultiMap');

describe('Tests the merge method on MultiMap', () => {
  const map = new MultiMap([ ['1', 2], ['3', 4], ['5', 6] ]);
  const map2 = new MultiMap([ ['7', 8], ['9', 10], ['11', 12] ]);

  it('Should merge map2 into map', done => {
    const oldEntries = [...map];

    map.merge(map2);

    expect([...map]).toEqual([...oldEntries, ...map2])

    done();
  });
});
