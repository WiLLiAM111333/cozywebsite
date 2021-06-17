const { MultiMap } = require('../../dist/lib/dataStructures/multimap/MultiMap');

describe('Tests the isEmpty property on MultiMap', () => {
  const map = new MultiMap([ ['1', 2], ['3', 4], ['5', 6] ]);

  it('Should have 3 entries in the map', done => {
    expect(map.size).toEqual(3);
    
    done();
  });

  it('Should have 0 entries in the map', done => {
    map.clear();

    expect(map.size).toEqual(0);
    
    done();
  });
});
