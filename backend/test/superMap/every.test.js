const { SuperMap } = require('../../dist/lib/dataStructures/superMap')

describe('Tests the SuperMap every method', () => {
  const map = new SuperMap();

  map.set('1', 2);
  map.set('3', 4);
  map.set('5', 6);
  map.set('7', 8);
  map.set('9', 10);

  it('Should return true', done => {
    const bool = map.every((value, key) => {
      const keyNum = Number(key);
      
      return Number.isInteger(value) && value < 11 
        && typeof key === 'string' && keyNum > 0 && keyNum < 10;
    });

    expect(bool).toBe(true);

    done();
  });

  it('Should return false', done => {
    const bool = map.every((value, key) => {
      const keyNum = Number(key);
      
      return Number.isInteger(value) && value < 11
        // Every key is not greater than 6  
        && typeof key === 'string' && keyNum > 6 && keyNum < 10;
    });

    expect(bool).toBe(false)
    
    done();
  });
});
