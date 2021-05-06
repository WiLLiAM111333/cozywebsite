const supertest = require('supertest');
const { app } = require('../../../dist/src/server/app');

describe('Tests the dog route on the animal router', () => {
  it('GET /api/v1/animals/dog/image', async done => {
    const response = await supertest(app)
      .get('/api/v1/animals/dog/image')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('image');
    
    done();
  });

  it('GET /api/v1/animals/dog/fact', async done => {
    const response = await supertest(app)
      .get('/api/v1/animals/dog/fact')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('fact');
    
    done();
  });

  it('GET /api/v1/animals/dog/', async done => {
    const response = await supertest(app)
      .get('/api/v1/animals/dog')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('image');
    expect(response.body).toHaveProperty('fact');
    
    done();
  });
});
