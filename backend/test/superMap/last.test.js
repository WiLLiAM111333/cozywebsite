const { SuperMap } = require('../../dist/lib/dataStructures/superMap');

describe('Tests the SuperMap last methods', () => {
  const map = new SuperMap()
  
  map.set('1', 2);
  map.set('3', 4);
  map.set('5', 6);

  it('Should return the last value in the SuperMap using last()', done => {  
    expect(map.last()).toEqual(6);

    done();
  });

  it('Should return the last key in the SuperMap using lastKey()', done => {
    expect(map.lastKey()).toEqual('5');

    done();
  });

  it('Should return the last entry in the SuperMap using lastEntry()', done => {
    expect(map.lastEntry()).toEqual(['5', 6]);
    
    done();
  });
});
