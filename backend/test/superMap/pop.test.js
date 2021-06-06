const { SuperMap } = require('../../dist/lib/dataStructures/superMap');

describe('Tests the SuperMap pop methods', () => {
  const map = new SuperMap()
  
  map.set('1', 2);
  map.set('3', 4);
  map.set('5', 6);

  it('Should return the last value in the SuperMap and delete the entry using pop()', done => {  
    expect(map.pop()).toEqual(6);
    expect(map.last()).toEqual(4);
    expect(map.size).toEqual(2);

    done();
  });

  it('Should return the last key in the SuperMap and delete the entry using popKey()', done => {
    expect(map.popKey()).toEqual('3');
    expect(map.lastKey()).toEqual('1');
    expect(map.size).toEqual(1);

    done();
  });

  it('Should return the last entry in the SuperMap and delete the entry using popEntry()', done => {
    expect(map.popEntry()).toEqual(['1', 2]);
    expect(map.lastEntry()).toEqual(undefined);
    expect(map.size).toEqual(0);
    
    done();
  });
});
