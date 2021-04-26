const { MusicQueue } = require('../../dist/lib/dataStructures/queue');;

describe('Tests the MusicQueue maxSize property', () => {
  const queue = new MusicQueue(['song one', 'song two', 'song three', 'song four']);
  queue.maxSize = 5;

  it('Should add a string to the queue', done => {
    queue.enqueue('song five');
    
    expect(queue.size).toEqual(5);

    done();
  });

  it('Should\'nt add any value to the queue', done => {
    queue.enqueue('song six');

    expect(queue.size).toEqual(5);
    
    done();
  });
});
