const { MultiMap } = require('../../dist/lib/dataStructures/multimap/MultiMap');

describe('Tests the erase method on MultiMap', () => {
  const map = new MultiMap([ ['1', 2], ['3', 4], ['5', 6], ['5', 8], ['5', 10] ]);

  it('Should delete all entries with keys matching \'5\'', done => {
    map.erase('5');

    expect(map.size).toEqual(2);
    
    done();
  });

  it('Should delete the second entry', done => {
    map.erase(2);

    expect(map.size).toEqual(1);
    
    done();
  });

  it('Should delete the entries from the first iteration of the iterator to the third', done => {
    const map2 = new MultiMap([ ['1', 2], ['3', 4], ['5', 6], ['7', 8], ['9', 10] ]);

    map2.erase([1, 3]);

    expect(map2.size).toEqual(3);

    done();
  });
});
