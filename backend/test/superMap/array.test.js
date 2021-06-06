const { SuperMap } = require('../../dist/lib/dataStructures/superMap');

describe('Tests the SuperMap array methods', () => {
  const map = new SuperMap()
  
  map.set('1', 2);
  map.set('3', 4);
  map.set('5', 6);

  it('Should return an array of values in the SuperMap using toArray()', done => {  
    const arr = map.toArray();
    
    expect(arr.length).toEqual(map.size);
    expect(arr).toEqual([2, 4, 6]);

    done();
  });

  it('Should return an array of keys in the SuperMap using toKeyArray()', done => {
    const arr = map.toKeyArray();

    expect(arr.length).toEqual(map.size);
    expect(arr).toEqual(['1', '3', '5']);
    
    done();
  });

  it('Should return an array-nested tuple of entries in the SuperMap using toEntryArray()', done => {
    const arr = map.toEntryArray();

    expect(arr.length).toEqual(map.size);
    expect(arr).toEqual([ ['1', 2], ['3', 4], ['5', 6] ]);
    
    done();
  });
});
