const { MultiMap } = require('../../dist/lib/dataStructures/multimap/MultiMap');

describe('Tests the isConcatSpreadable property of Symbol on the class', () => {
  const map = new MultiMap([ ['1', 2], ['3', 4] ]);

  it('Should return true', done => {
    expect(map[Symbol.isConcatSpreadable]).toBe(true);

    done();
  });

  it('Tests the spread operator (...)', done => {
    expect([...map]).toEqual([...map.entries()]);

    done();
  });
});
