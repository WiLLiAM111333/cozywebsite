const { SuperSet } = require('../../dist/lib/dataStructures/superSet');

describe('Tests the SuperSet array property', () => {
  it('Should give an empty array', done => {
    const set = new SuperSet();

    expect(set.array.length).toEqual(0);

    done();
  });

  it('Should give an array of 10 unique values', done => {
    const set = new SuperSet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10]);

    expect(set.array.length).toEqual(10);

    done();
  });
});
