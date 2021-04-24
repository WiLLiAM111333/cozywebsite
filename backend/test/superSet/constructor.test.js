const { SuperSet } = require('../../dist/lib/dataStructures/superSet');

describe('Tests the SuperSet constructor', () => {
  it('Should give an empty SuperSet', done => {
    const set = new SuperSet();

    expect(set.has(1)).toBe(false);

    done();
  });

  it('Should give a SuperSet of 10 unique values', done => {
    const set = new SuperSet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10]);

    expect(set.has(10)).toBe(true);

    set.delete(10);

    expect(set.has(10)).toBe(false);

    done();
  });
});
