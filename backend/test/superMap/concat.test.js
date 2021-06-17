const { SuperMap } = require('../../dist/lib/dataStructures/superMap');

describe('Tests the SuperMap concat method', () => {
  it('Should return a new SuperMap with all the concatenated maps in parameter placement order', done => {  
    const map1 = new SuperMap([ ['1', 2], ['3', 4], ['5', 6] ])
    const map2 = new SuperMap([ ['7', 8], ['9', 10], ['11', 12] ]);
    const map3 = new SuperMap([ ['13', 14], ['15', 16], ['17', 18] ]);
    const map4 = map1.concat(map2, map3);
    
    const totalSize = [map1.size, map2.size, map3.size].reduce((size, accumulator) => accumulator += size, 0);

    expect(map4.size).toEqual(totalSize);
    expect(map4.first()).toEqual(2);
    expect(map4.last()).toEqual(18)

    done();
  });
});
