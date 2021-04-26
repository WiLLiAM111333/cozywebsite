const { SuperArray } = require('../../dist/lib/dataStructures/superArray');

describe('Tests the SuperArray rotateLeft method', () => {
  const arr = new SuperArray([1, 2, 3, 4]);

  it('Should rotate the array 1 step', done => {
    const rotatedArr = arr.rotateLeft(1);

    expect(rotatedArr).toEqual([2, 3, 4, 1]);

    done();
  });

  it('Should rotate the array 2 steps', done => {
    const rotatedArr = arr.rotateLeft(2);

    expect(rotatedArr).toEqual([3, 4, 1, 2]);

    done();
  });

  it('Should rotate the array 3 steps', done => {
    const rotatedArr = arr.rotateLeft(3);

    expect(rotatedArr).toEqual([4, 1, 2, 3]);

    done();
  });

  it('Should rotate the array 0 steps', done => {
    const rotatedArr = arr.rotateLeft(0);
    const otherRotatedArr = arr.rotateLeft(-1);
    const thirdRotatedArr = arr.rotateLeft(arr.length);

    expect(rotatedArr).toEqual(arr);
    expect(otherRotatedArr).toEqual(arr);
    expect(thirdRotatedArr).toEqual(arr);

    done();
  });
});
