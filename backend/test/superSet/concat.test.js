const { SuperSet } = require('../../dist/lib/dataStructures/superSet');

describe('Tests the SuperSet concat method', () => {
  it('Should give a set with unique values ranging from 1 - 20', done => {
    const set = new SuperSet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10]);
    const otherSet = new SuperSet([1, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    
    const concatSet = set.concat(otherSet);

    expect(concatSet.size).toEqual(20)

    done();
  });
});
