const { SuperArray } = require('../../dist/lib/dataStructures/superArray');

describe('Tests the SuperArray toObject method', () => {
  const arr = new SuperArray([1, 2, 3, 4]);

  it('Should make the array an object', done => {
    const obj = arr.toObject();

    expect(obj).toEqual({ '0': 1, '1': 2, '2': 3, '3': 4 });
    expect(Object.keys(obj).length).toEqual(arr.length);

    done();
  });
});
