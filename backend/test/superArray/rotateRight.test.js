const { SuperArray } = require('../../dist/lib/dataStructures/superArray');

describe('Tests the SuperArray rotateRight method', () => {
  const arr = new SuperArray([1, 2, 3, 4]);

  it('Should rotate the array 1 step', done => {
    const rotatedArr = arr.rotateRight(1);

    expect(rotatedArr).toEqual([4, 1, 2, 3]);

    done();
  });

  it('Should rotate the array 2 steps', done => {
    const rotatedArr = arr.rotateRight(2);

    expect(rotatedArr).toEqual([3, 4, 1, 2]);

    done();
  });

  it('Should rotate the array 3 steps', done => {
    const rotatedArr = arr.rotateRight(3);

    expect(rotatedArr).toEqual([2, 3, 4, 1]);

    done();
  });

  it('Should rotate the array 0 steps', done => {
    const rotatedArr = arr.rotateRight(0);
    const otherRotatedArr = arr.rotateRight(-1);
    const thirdRotatedArr = arr.rotateRight(arr.length);

    expect(rotatedArr).toEqual(arr);
    expect(otherRotatedArr).toEqual(arr);
    expect(thirdRotatedArr).toEqual(arr);

    done();
  });
});
