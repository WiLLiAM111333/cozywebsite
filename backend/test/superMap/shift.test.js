const { SuperMap } = require('../../dist/lib/dataStructures/superMap');

describe('Tests the SuperMap shift methods', () => {
  const map = new SuperMap()
  
  map.set('1', 2);
  map.set('3', 4);
  map.set('5', 6);

  it('Should return the first value in the SuperMap and delete the entry using shift()', done => {  
    expect(map.shift()).toEqual(2);

    done();
  });

  it('Should return the first key in the SuperMap and delete the entry using shiftKey()', done => {
    expect(map.shiftKey()).toEqual('3');

    done();
  });

  it('Should return the first entry in the SuperMap and delete the entry using shiftEntry()', done => {
    expect(map.shiftEntry()).toEqual(['5', 6]);
    expect(map.size).toEqual(0);

    done();
  });
});
