const request = require('supertest');
const app = require('../app');
const path = require('path');
const env = require('dotenv').config();
const mongoose = require('mongoose');

let userToken = '';
let happyRecordId = '';
// SETUP
beforeAll(async () => {
  const res = await request(app)
    .post('/users/login')
    .set('Content-Type', 'application/json')
    .send({
      email: 'dude@sschilling.com',
      password: 'dude',
    });
  userToken = `Bearer ${res.body.token}`;

  //create a sample record

  const happyRecordResponse = await request(app)
    .post('/happy/')
    .set('Content-Type', 'application/json')
    .set('Authorization', userToken)
    .send({
      happyScore: '3',
      sleepHours: '5',
      kindness: 'true',
      exercise: 'true',
      exerciseLevel: 'high',
      kindnessNote: 'did something super nice',
      gratitudeNote: 'just blessed',
    });
  happyRecordId = happyRecordResponse.body.happyRecord._id;
  console.log(happyRecordId);
});

// TEARDOWN
afterAll(async (done) => {
  const happyDeleteResponse = await request(app)
    .delete(`/happy/${happyRecordId}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', userToken);

  console.log('DELETE RESPONSE:', happyDeleteResponse.body);
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});

describe('GET ALL HAPPY RECORDS', () => {
  it('should get all happy records and return 200 ', async (done) => {
    const res = await request(app)
      .get('/happy/')
      .set('Content-Type', 'application/json')
      .set('Authorization', userToken);
    expect(res.status).toBe(200);
    done();
  });

  it('should return 401 when not sent with proper user token ', async (done) => {
    const res = await request(app)
      .get('/happy/')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'sdfa');
    expect(res.status).toBe(401);
    done();
  });
});

it('should return a single record', async (done) => {
  res = await request(app)
    .get(`/happy/${happyRecordId}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', userToken);
  console.log(res.body);
  expect(res.status).toBe(200);
  done();
});
