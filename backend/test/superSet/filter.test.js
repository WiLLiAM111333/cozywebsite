const { SuperSet } = require('../../dist/lib/dataStructures/superSet');

describe('Tests the SuperSet filter method', () => {
  it('Should give a new SuperSet of filtered values lower than 6 (values ranging from 1 - 5)', done => {
    const set = new SuperSet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10]);
    
    const filteredSet = set.filter(value => value < 6);

    expect(filteredSet.size).toEqual(5);
    expect(filteredSet.has(6)).toBe(false);
    expect(set.has(6)).toBe(true);

    done();
  });
});
