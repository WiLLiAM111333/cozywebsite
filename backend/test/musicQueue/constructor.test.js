const { MusicQueue } = require('../../dist/lib/dataStructures/queue');

describe('Tests the MusicQueue constructor', () => {
  it('Should create an empty MusicQueue', done => {
    const queue = new MusicQueue();

    expect(queue).toBeInstanceOf(MusicQueue)
    expect(queue.size).toEqual(0);

    done();
  });

  it('Should create a MusicQueue with 2 totally legit music links', done => {
    const queue = new MusicQueue([
      'https://some-music-provider.com/songs/cool-song', 
      'https://some-music-provider.com/songs/another-cool-song'
    ]);

    expect(queue).toBeInstanceOf(MusicQueue)
    expect(queue.size).toEqual(2);

    done();
  });
});
