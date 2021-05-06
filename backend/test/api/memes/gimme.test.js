const supertest = require('supertest');
const { app } = require('../../../dist/src/server/app');

describe('Tests the gimme routes', () => {
  it('GET /api/v1/memes/reddit?sub=dankmemes', async done => {
    const response = await supertest(app)
      .get('/api/v1/memes/reddit?sub=dankmemes')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('postLink');
    expect(response.body).toHaveProperty('subreddit');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('url');
    expect(response.body).toHaveProperty('nsfw');
    expect(response.body).toHaveProperty('spoiler');
    expect(response.body).toHaveProperty('author');
    expect(response.body).toHaveProperty('ups');
    expect(response.body).toHaveProperty('preview');
    expect(response.body.preview).toBeInstanceOf(Array);
    expect(response.body.subreddit).toEqual('dankmemes');

    done();
  });

  it('GET /api/v1/memes/reddit?sub=memes', async done => {
    const response = await supertest(app)
      .get('/api/v1/memes/reddit?sub=memes')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('postLink');
    expect(response.body).toHaveProperty('subreddit');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('url');
    expect(response.body).toHaveProperty('nsfw');
    expect(response.body).toHaveProperty('spoiler');
    expect(response.body).toHaveProperty('author');
    expect(response.body).toHaveProperty('ups');
    expect(response.body).toHaveProperty('preview');
    expect(response.body.preview).toBeInstanceOf(Array);
    expect(response.body.subreddit).toEqual('memes');

    done();
  });

  it('GET /api/v1/memes/reddit?sub=me_irl', async done => {
    const response = await supertest(app)
      .get('/api/v1/memes/reddit?sub=me_irl')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('postLink');
    expect(response.body).toHaveProperty('subreddit');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('url');
    expect(response.body).toHaveProperty('nsfw');
    expect(response.body).toHaveProperty('spoiler');
    expect(response.body).toHaveProperty('author');
    expect(response.body).toHaveProperty('ups');
    expect(response.body).toHaveProperty('preview');
    expect(response.body.preview).toBeInstanceOf(Array);
    expect(response.body.subreddit).toEqual('me_irl');

    done();
  });
});
