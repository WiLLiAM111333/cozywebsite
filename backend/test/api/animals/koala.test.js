const supertest = require('supertest');
const { app } = require('../../../dist/src/server/app');

describe('Tests the koala route on the animal router', () => {
  it('GET /api/v1/animals/koala/image', async done => {
    const response = await supertest(app)
      .get('/api/v1/animals/koala/image')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('image');
    
    done();
  });

  it('GET /api/v1/animals/koala/fact', async done => {
    const response = await supertest(app)
      .get('/api/v1/animals/koala/fact')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('fact');
    
    done();
  });

  it('GET /api/v1/animals/koala', async done => {
    const response = await supertest(app)
      .get('/api/v1/animals/koala')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('image');
    expect(response.body).toHaveProperty('fact');
    
    done();
  });
});
