const { MultiMap } = require('../../dist/lib/dataStructures/multimap/MultiMap');

describe('Tests the various multimap iterators', () => {
  const map = new MultiMap([ ['1', 2], ['3', 4], ['5', 6], ['7', 8] ]);

  it('Checks if you can use for-of on the MultiMap', done => {
    let counter = 0;

    for(const { key, value } of map) {
      if(!key || !value) {
        break;
      }

      counter++;
    }

    expect(counter).toEqual(map.size);

    done();
  });

  it('Checks if you can use map.values() in a for-of loop', done => {
    let counter = 0;

    for(const value of map.values()) {
      if(!value) {
        break;
      }

      counter++;
    }

    expect(counter).toEqual(map.size);

    done();
  });

  it('Checks if you can use map.keys() in a for-of loop', done => {
    let counter = 0;

    for(const key of map.keys()) {
      if(!key) {
        break;
      }

      counter++;
    }

    expect(counter).toEqual(map.size);

    done();
  });

  it('Checks if you can use map.entries() in a for-of loop', done => {
    let counter = 0;

    for(const { key, value } of map.entries()) {
      if(!key || !value) {
        break;
      }

      counter++;
    }

    expect(counter).toEqual(map.size);

    done();
  });
});
