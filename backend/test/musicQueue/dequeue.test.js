const { MusicQueue } = require('../../dist/lib/dataStructures/queue');;

describe('Tests the MusicQueue dequeue method', () => {
  it('Should return \'song one\' and then \'song two\'', done => {
    const queue = new MusicQueue(['song one', 'song two']);

    expect(queue.dequeue()).toEqual('song one');
    expect(queue.dequeue()).toEqual('song two');
    expect(queue.size).toEqual(0);

    done();
  });
});
