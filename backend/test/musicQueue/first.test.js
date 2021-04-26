const { MusicQueue } = require('../../dist/lib/dataStructures/queue');;

describe('Tests the MusicQueue first method', () => {
  it('Should return \'song one\' twice', done => {
    const queue = new MusicQueue(['song one', 'song two']);

    expect(queue.first()).toEqual('song one');
    expect(queue.first()).toEqual('song one');
    expect(queue.size).toEqual(2);

    done();
  });
});
