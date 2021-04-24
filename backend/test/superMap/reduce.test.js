const { SuperMap } = require('../../dist/lib/dataStructures/superMap')

describe('Tests the SuperMap reduce method', () => {
  const map = new SuperMap();

  map.set('1', 2);
  map.set('3', 4);
  map.set('5', 6);
  map.set('7', 8);
  map.set('9', 10);

  it('Should return 55', done => {
    const value = map.reduce((accumulator, value, key) => 
      accumulator += (value + Number(key))
    , 0);

    expect(value).toEqual(55);

    done();
  });
});
