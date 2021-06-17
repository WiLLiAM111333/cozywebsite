const { MultiMap } = require('../../dist/lib/dataStructures/multimap/MultiMap');

describe('Tests the insert method on MultiMap', () => {
  const map = new MultiMap([ ['1', 2], ['3', 4], ['5', 6] ]);

  it('Should have 4 entries in the map', done => {
    map.insert('7', 8);

    expect(map.size).toEqual(4);
    
    done();
  });
});
