const supertest = require('supertest');
const { app } = require('../../../dist/src/server/app');

describe('Tests the randomAPI routes', () => {
  it('GET /api/v1/memes/randomapi', async done => {
    const response = await supertest(app)
      .get('/api/v1/memes/randomapi')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('image');
    expect(response.body).toHaveProperty('caption');
    expect(response.body).toHaveProperty('category');

    done();
  });
});
