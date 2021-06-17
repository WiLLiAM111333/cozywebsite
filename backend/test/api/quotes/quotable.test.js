const supertest = require('supertest');
const { app } = require('../../../dist/src/server/app');

describe('Tests the quotable API routes', () => {
  it('GET /api/v1/quotes/quotable', async done => {
    const response = await supertest(app)
      .get('/api/v1/quotes/quotable')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('tags');
    expect(response.body).toHaveProperty('content');
    expect(response.body).toHaveProperty('author');
    expect(response.body).toHaveProperty('length');
    expect(response.body.tags).toBeInstanceOf(Array);

    done();
  });

  it('GET /api/v1/quotes/quotable/authors', async done => {
    const response = await supertest(app)
      .get('/api/v1/quotes/quotable/authors')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('count');
    expect(response.body).toHaveProperty('totalCount');
    expect(response.body).toHaveProperty('lastItemIndex');
    expect(response.body).toHaveProperty('results');
    expect(response.body.results).toBeInstanceOf(Array);
    expect(response.body.results[0]).toBeInstanceOf(Object);
    expect(response.body.results[0]).toHaveProperty('_id');
    expect(response.body.results[0]).toHaveProperty('name');
    expect(response.body.results[0]).toHaveProperty('quoteCount');

    done();
  });
});
