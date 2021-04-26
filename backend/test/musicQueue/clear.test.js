const { MusicQueue } = require('../../dist/lib/dataStructures/queue');

describe('Tests the MusicQueue clear method', () => {
  it('Should clear the queue', done => {
    const queue = new MusicQueue(['song one', 'song two']);

    expect(queue.size).toEqual(2);

    queue.clear();

    expect(queue.size).toEqual(0);

    done();
  });
});
