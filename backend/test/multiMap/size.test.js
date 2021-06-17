const { MultiMap } = require('../../dist/lib/dataStructures/multimap/MultiMap');

describe('Tests the size property on MultiMap', () => {
  const values = [
    [ '1', 2   ],
    [ '3', 4   ],
    [ '5', 6   ],
    [ '7', 8   ],
    [ '9', 10  ],
    [ '11', 12 ],
    [ '13', 14 ]
  ];

  const values2 = [
    [ '15', 16 ],
    [ '17', 18 ],
    [ '19', 20 ],
    [ '21', 22 ],
    [ '23', 24 ],
    [ '25', 26 ],
    [ '27', 28 ]
  ];

  const map = new MultiMap(values);

  it('Tests size after an insert', done => {
    map.insert('7', 8);

    expect(map.size).toEqual(8);

    done();
  });

  it('Tests after an erase of 2 entries', done => {
    map.erase('7');

    expect(map.size).toEqual(6);

    done();
  });

  it('Tests after an erase of a flat number', done => {
    map.erase(1);

    expect(map.size).toEqual(5);

    done();
  });

  it('Tests after an erase using a range tuple', done => {
    map.erase([1, 3]);

    expect(map.size).toEqual(3);

    done();
  });

  it('Tests after an extract', done => {
    const value = map.extract('9');

    if(typeof value !== 'undefined') {
      expect(map.size).toEqual(2);
    } else {
      expect(map.size).toEqual(3);
    }

    done();
  });

  // Merge
});
