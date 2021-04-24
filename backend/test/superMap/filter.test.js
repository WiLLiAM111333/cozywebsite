const { SuperMap } = require('../../dist/lib/dataStructures/superMap')

describe('Tests the SuperMap every method', () => {
  const map = new SuperMap();

  map.set('1', 2);
  map.set('3', 4);
  map.set('5', 6);
  map.set('7', 8);
  map.set('9', 10);

  it('Should create a new SuperMap of all values below 8', done => {
    const otherMap = map.filter(value => value < 8);

    expect(otherMap.first()).toEqual(2);
    expect(otherMap.last()).toEqual(6);
    expect(otherMap.size).toEqual(3);

    done();
  });
});
