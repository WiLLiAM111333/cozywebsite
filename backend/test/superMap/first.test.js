const { SuperMap } = require('../../dist/lib/dataStructures/superMap');

describe('Tests the SuperMap first methods', () => {
  const map = new SuperMap()
  
  map.set('1', 2);
  map.set('3', 4);
  map.set('5', 6);

  it('Should return the first value in the SuperMap using first()', done => {  
    expect(map.first()).toEqual(2);

    done();
  });

  it('Should return the first key in the SuperMap using firstKey()', done => {
    expect(map.firstKey()).toEqual('1');

    done();
  });

  it('Should return the first entry in the SuperMap using firstEntry()', done => {
    expect(map.firstEntry()).toEqual(['1', 2]);
    
    done();
  });
});
