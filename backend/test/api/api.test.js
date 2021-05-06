const supertest = require('supertest');
const { app } = require('../../dist/src/server/app');
const { Constants } = require('../../dist/src/utils/constants');

const { API_MESSAGE } = Constants;

describe('GET /api/v1', () => {
  it('Should respond with a message', async done => {
    const response = await supertest(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toEqual(API_MESSAGE);

    done();
  });
});
