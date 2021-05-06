const supertest = require('supertest');
const { app } = require('../../../dist/src/server/app');

describe('Tests the bird route on the animal router', () => {
  it('GET /api/v1/animals/bird/image', async done => {
    const response = await supertest(app)
      .get('/api/v1/animals/bird/image')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('image');
    
    done();
  });

  it('GET /api/v1/animals/bird/fact', async done => {
    const response = await supertest(app)
      .get('/api/v1/animals/bird/fact')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('fact');
    
    done();
  });

  it('GET /api/v1/animals/bird', async done => {
    const response = await supertest(app)
      .get('/api/v1/animals/bird')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('image');
    expect(response.body).toHaveProperty('fact');
    
    done();
  });
});
