const { MultiMap } = require('../../dist/lib/dataStructures/multimap/MultiMap');

describe('Tests the extract method on MultiMap', () => {
  const map = new MultiMap([ ['1', 2], ['3', 4], ['5', 6] ]);

  it('Should extract the entry { \'1\': 2 } ', done => {
    const { key, value } = map.extract('1');

    expect(key).toEqual('1');
    expect(value).toEqual(2);

    done();
  });
});
