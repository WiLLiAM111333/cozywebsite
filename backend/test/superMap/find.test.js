const { SuperMap } = require('../../dist/lib/dataStructures/superMap')

describe('Tests the SuperMap find methods', () => {
  const map = new SuperMap();

  map.set('1', 2);
  map.set('3', 4);
  map.set('5', 6);
  map.set('7', 8);
  map.set('9', 10);

  it('Should return 8', done => {
    const value = map.find(value => value > 6);

    expect(value).toEqual(8);

    done();
  });

  it('Should return \'7\'', done => {
    const value = map.findKey(value => value > 6);

    expect(value).toEqual('7');

    done();
  });

  it('Should return [\'7\', 8]', done => {
    const value = map.findEntry(value => value > 6);

    expect(value).toEqual(['7', 8]);

    done();
  });
});
