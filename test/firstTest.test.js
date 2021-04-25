const request = require('supertest');
const app = require('../app');
const path = require('path');
const env = require('dotenv').config();

if (env.error) {
  throw env.error;
}
console.log('process.env.MONGO_DB_PW is : ', process.env.MONGO_DB_PW);
describe('simple test to make sure jest is working', () => {
  it('should return true', () => {
    expect(true).toBe(true);
  });
});

describe('first get test', () => {
  it('should return 200', async () => {
    const res = await request(app).get('/happy/');
    // console.log('RESPONSE', res);
    expect(res.status).toBe(200);
  });
});
