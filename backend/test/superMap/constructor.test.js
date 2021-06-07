const { SuperMap } = require('../../dist/lib/dataStructures/superMap');

describe('Tests the SuperMap constructor', () => {
  const values = [
    ['1', 2],
    ['3', 4],
    ['5', 6]
  ];

  it('Should instantiate a new SuperMap from an array of key-value tuples', done => {
    const map = new SuperMap(values);

    expect(map.size).toEqual(3);
    expect(map.toEntryArray()).toEqual(values);
    expect(map.toArray()).toEqual(values.map(arr => arr[1]));
    expect(map.toKeyArray()).toEqual(values.map(arr => arr[0]));

    done();
  });

  it('Should instantiate a new SuperMap from an existing Map', done => {
    const map = new Map(values);
    const superMap = new SuperMap(map);

    expect(superMap.size).toEqual(3);
    expect(superMap.size).toEqual(map.size);

    expect(superMap.toEntryArray()).toEqual(values);
    expect(superMap.toArray()).toEqual(values.map(arr => arr[1]));
    expect(superMap.toKeyArray()).toEqual(values.map(arr => arr[0]));

    expect(superMap.get('1')).toEqual(map.get('1'));
    expect(superMap.get('3')).toEqual(map.get('3'));
    expect(superMap.get('5')).toEqual(map.get('5'));

    // Polyfill for Map
    expect(superMap.toArray()).toEqual([...map.values()]);
    expect(superMap.toKeyArray()).toEqual([...map.keys()]);
    expect(superMap.toEntryArray()).toEqual([...map.entries()]);

    done();
  });

  it('Should instantiate a new SuperMap from an existing SuperMap', done => {
    const map1 = new SuperMap(values);
    const map2 = new SuperMap(map1);

    expect(map2.size).toEqual(3);
    expect(map2.size).toEqual(map1.size);
    
    expect(map2.toEntryArray()).toEqual(values);
    expect(map2.toArray()).toEqual(values.map(arr => arr[1]));
    expect(map2.toKeyArray()).toEqual(values.map(arr => arr[0]));

    expect(map2.get('1')).toEqual(map1.get('1'));
    expect(map2.get('3')).toEqual(map1.get('3'));
    expect(map2.get('5')).toEqual(map1.get('5'));

    expect(map2.toArray()).toEqual(map1.toArray());
    expect(map2.toKeyArray()).toEqual(map1.toKeyArray());
    expect(map2.toEntryArray()).toEqual(map1.toEntryArray());

    done();
  })
});
