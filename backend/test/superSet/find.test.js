const { SuperSet } = require('../../dist/lib/dataStructures/superSet');

describe('Tests the SuperSet find method', () => {
  const set = new SuperSet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10]);

  it('Should return undefined', done => {
    // No value in the set is greater than 10, so it should return undefined
    const value = set.find(value => value > 10);

    expect(value).toBe(undefined);

    done();
  });

  it('Should return 7', done => {
    const value = set.find(value => value > 6);

    expect(value).toEqual(7);

    done();
  });

  it('Should return 1', done => {
    const value = set.find(value => value < 10);

    expect(value).toEqual(1);

    done();
  });
});
