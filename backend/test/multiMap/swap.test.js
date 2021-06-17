const { MultiMap } = require('../../dist/lib/dataStructures/multimap/MultiMap');

describe('Tests the swap method on MultiMap', () => {
  const map = new MultiMap([ ['1', 2], ['3', 4], ['5', 6] ]);
  const map2 = new MultiMap([ ['7', 8], ['9', 10], ['11', 12] ]);

  it('Should swap the map values', done => {
    const preSwap = {
      map: [...map],
      map2: [...map2]
    }

    map.swap(map2);

    expect([...map]).toEqual(preSwap.map2);
    expect([...map2]).toEqual(preSwap.map);

    done();
  });
});
