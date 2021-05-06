const supertest = require('supertest');
const { app } = require('../../../dist/src/server/app');

describe('Tests the Dadjoke routes', () => {
  it('GET /api/v1/memes/dadjoke', async done => {
    const response = await supertest(app)
      .get('/api/v1/memes/dadjoke')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('response_type');
    expect(response.body).toHaveProperty('username');
    expect(response.body).toHaveProperty('attachments')
    expect(response.body.attachments).toBeInstanceOf(Array)
    expect(response.body.attachments[0]).toHaveProperty('fallback');
    expect(response.body.attachments[0]).toHaveProperty('footer');
    expect(response.body.attachments[0]).toHaveProperty('text');

    done();
  });
});
