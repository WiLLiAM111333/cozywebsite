import { app } from './app';
import supertest from 'supertest'
import { Constants } from '../utils/constants';

describe('Simple test', () => {
  it('Should respond with a simple message', async (done) => {
    const res = await supertest(app)
      .get('/')
      .expect(200);

    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual(Constants.API_MESSAGE);
    
    done();
  });
});
