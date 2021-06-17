const { MultiMap } = require('../../dist/lib/dataStructures/multimap/MultiMap');
const { inspect } = require('util');

describe('Tests the util.inspect method on the MultiMap', () => {
  const map = new MultiMap([ ['1', 2], ['3', 4], ['5', 6], ['7', 8] ]);

  it('Tests an empty map', done => {
    const emptyMap = new MultiMap();
    const inspectStr = inspect(emptyMap);

    expect(inspectStr).toEqual('MultiMap(0) {  }');

    done();
  });

  it('Tests with the values', done => {
    const inspectStr = inspect(map);

    expect(inspectStr).not.toBe(undefined);
    expect(inspectStr.length).toBeGreaterThan(0);
    expect(inspectStr.startsWith(`MultiMap(${map.size}) {`)).toEqual(true);

    done();
  });
});
