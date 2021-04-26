const { SuperArray } = require('../../dist/lib/dataStructures/superArray');

describe('Tests the SuperArray last method', () => {
  const arr = new SuperArray([1, 2, 3, 4]);

  it('Should return the last element without deleting it', done => {
    const value = arr.last();

    expect(value).toEqual(4);
    expect(arr).toEqual([1, 2, 3, 4]);
    expect(value).toEqual(arr.pop());
    expect(arr).toEqual([1, 2, 3]);

    done();
  });
});
