const { MusicQueue } = require('../../dist/lib/dataStructures/queue');;

describe('Tests the MusicQueue enqueue method', () => {
  it('Should add a string to the end of the queue', done => {
    const queue = new MusicQueue(['song one', 'song two', 'song three', 'song four']);

    queue.enqueue('song five');

    expect(queue.size).toEqual(5);
    expect(queue.dequeue()).toEqual('song one');
    expect(queue.dequeue()).toEqual('song two');
    expect(queue.dequeue()).toEqual('song three');
    expect(queue.dequeue()).toEqual('song four');
    expect(queue.first()).toEqual('song five');
    expect(queue.size).toEqual(1);

    done();
  });
});
