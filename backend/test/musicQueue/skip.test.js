const { MusicQueue } = require('../../dist/lib/dataStructures/queue');;

describe('Tests the MusicQueue skip method', () => {
  it('Should skip 1 song in the queue', done => {
    const queue = new MusicQueue([
      'song one', 'song two',
      'song three', 'song four',
      'song five', 'song six',
    ]);

    queue.skip(1);
    
    expect(queue.size).toEqual(5);
    expect(queue.first()).toEqual('song two');

    done();
  });
});
