const { MultiMap } = require('../../dist/lib/dataStructures/multimap/MultiMap');

describe('Tests the contains method on MultiMap', () => {
  const map = new MultiMap([ ['1', 2], ['3', 4], ['5', 6] ]);

  it('Should return true', done => {
    expect(map.contains('5')).toBe(true);

    done();
  });

  it('Should return false', done => {
    expect(map.contains('11')).toBe(false);

    done();
  })
});
