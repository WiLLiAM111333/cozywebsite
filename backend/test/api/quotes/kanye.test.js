const supertest = require('supertest');
const { app } = require('../../../dist/src/server/app');

describe('Tests the kanye quote route', () => {
  it('GET /api/v1/quotes/kanye', async done => {
    const response = await supertest(app)
      .get('/api/v1/quotes/kanye')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('quote')
    
    done(); 
  });
});
