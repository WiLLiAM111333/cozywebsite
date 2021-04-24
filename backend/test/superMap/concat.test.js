const { SuperMap } = require('../../dist/lib/dataStructures/superMap');

describe('Tests the SuperMap concat method', () => {
  const map = new SuperMap()
  
  map.set('1', 2);
  map.set('3', 4);
  map.set('5', 6);

  it('Should return a new SuperMap with all the concatenated maps in parameter placement order', done => {  
    const otherMap = new SuperMap();

    otherMap.set('6', 7);
    otherMap.set('8', 9);
    otherMap.set('10', 11);

    const thirdMap = new SuperMap();

    thirdMap.set('12', 13);
    thirdMap.set('14', 15);
    thirdMap.set('16', 17);

    const fourthMap = map.concat(thirdMap, otherMap);
    
    expect(fourthMap.size).toEqual(map.size + otherMap.size + thirdMap.size);
    expect(fourthMap.first()).toEqual(2);
    expect(fourthMap.last()).toEqual(11)

    done();
  });
});
