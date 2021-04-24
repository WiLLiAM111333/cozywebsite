const { SuperSet } = require('../../dist/lib/dataStructures/superSet');

describe('Tests the SuperSet reduce method', () => {
  it('Should give a value of 55', done => {
    const set = new SuperSet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10]);
    
    const value = set.reduce((accumulator, value) => accumulator += value, 0);

    expect(value).toEqual(55);

    done();
  });
});
