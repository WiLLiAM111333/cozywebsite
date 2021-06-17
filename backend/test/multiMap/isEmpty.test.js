const { MultiMap } = require('../../dist/lib/dataStructures/multimap/MultiMap');

describe('Tests the isEmpty property on MultiMap', () => {
  const map = new MultiMap()
  const map2 = new MultiMap([ ['1', 2] ]);

  it('Should return true', done => {
    expect(map.isEmpty).toBe(true);
    
    done();
  });

  it('Should return false', done => {
    expect(map2.isEmpty).toBe(false);
    
    done();
  });
});
