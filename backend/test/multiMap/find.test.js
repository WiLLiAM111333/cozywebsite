const { MultiMap } = require('../../dist/lib/dataStructures/multimap/MultiMap');

describe('Tests the find method on MultiMap', () => {
  const map = new MultiMap([ ['1', 2], ['3', 4], ['5', 6], ['5', 7] ]);

  it('Should return { \'5\': 6 }', done => {
    expect(map.find('5')).toEqual({ key: '5', value: 6 });

    done();
  });
});
