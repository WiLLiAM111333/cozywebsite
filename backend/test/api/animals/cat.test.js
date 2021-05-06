const supertest = require('supertest');
const { app } = require('../../../dist/src/server/app');

describe('Tests the cat route on the animal router', () => {
  it('GET /api/v1/animals/cat/image', async done => {
    const response = await supertest(app)
      .get('/api/v1/animals/cat/image')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('image');
    
    done();
  });

  it('GET /api/v1/animals/cat/fact', async done => {
    const response = await supertest(app)
      .get('/api/v1/animals/cat/fact')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('fact');
    
    done();
  });

  it('GET /api/v1/animals/cat', async done => {
    const response = await supertest(app)
      .get('/api/v1/animals/cat')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('image');
    expect(response.body).toHaveProperty('fact');
    
    done();
  });
});
