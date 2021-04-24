const { SuperMap } = require('../../dist/lib/dataStructures/superMap')

describe('Tests the SuperMap some method', () => {
  const map = new SuperMap();

  map.set('1', 2);
  map.set('3', 4);
  map.set('5', 6);
  map.set('7', 8);
  map.set('9', 10);

  it('Should return true', done => {
    const value = map.some(value => value > 6 && value < 10); // 8

    expect(value).toBe(true);

    done();
  });
});
