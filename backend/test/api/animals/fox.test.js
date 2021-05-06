const supertest = require('supertest');
const { app } = require('../../../dist/src/server/app');

describe('Tests the fox route on the animal router', () => {
  it('GET /api/v1/animals/fox/image', async done => {
    const response = await supertest(app)
      .get('/api/v1/animals/fox/image')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('image');
    
    done();
  });

  it('GET /api/v1/animals/fox/fact', async done => {
    const response = await supertest(app)
      .get('/api/v1/animals/fox/fact')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('fact');
    
    done();
  });

  it('GET /api/v1/animals/fox', async done => {
    const response = await supertest(app)
      .get('/api/v1/animals/fox')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('image');
    expect(response.body).toHaveProperty('fact');
    
    done();
  });
});
