const supertest = require('supertest');
const { app } = require('../../../dist/src/server/app');

describe('Tests the panda route on the animal router', () => {
  it('GET /api/v1/animals/panda/image', async done => {
    const response = await supertest(app)
      .get('/api/v1/animals/panda/image')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('image');
    
    done();
  });

  it('GET /api/v1/animals/panda/fact', async done => {
    const response = await supertest(app)
      .get('/api/v1/animals/panda/fact')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('fact');
    
    done();
  });

  it('GET /api/v1/animals/panda', async done => {
    const response = await supertest(app)
      .get('/api/v1/animals/panda')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('image');
    expect(response.body).toHaveProperty('fact');
    
    done();
  });
});
