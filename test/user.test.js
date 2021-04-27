const request = require('supertest');
const app = require('../app');
const path = require('path');
const env = require('dotenv').config();
const mongoose = require('mongoose');

let userToken = '';
let userId = '';
beforeAll(async () => {
  const res = await request(app)
    .post('/users/login')
    .set('Content-Type', 'application/json')
    .send({
      email: 'dude@sschilling.com',
      password: 'dude',
    });
  userToken = `Bearer ${res.body.token}`;
});

// close the connections
afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});

// TESTS
describe('LOGIN WITH CORRECT USER & PASS SHOULD RETURN A JWT_TOKEN', () => {
  it('Should get a valid JWT token by posting the user creds to /login', async (done) => {
    const res = await request(app)
      .post('/users/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'dude@sschilling.com',
        password: 'dude',
      });
    expect(res.status).toBe(200);
    done();
  });
});

describe('TEST INVALID LOGINS', () => {
  it('login with bad password should return 401', async (done) => {
    const res = await request(app)
      .post('/users/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'dude@sschilling.com',
        password: 'badd-password',
      });
    expect(res.status).toBe(401);
    done();
  });

  it('login with invalid email address should return 401', async (done) => {
    const res = await request(app).post('/users/login').send({
      email: 'd@sschilling.com',
      password: 'badd-password',
    });
    expect(res.status).toBe(401);
    done();
  });
});

// create a user test
describe('CREATE USER ERRORS', () => {
  it('creating a user without a valid JWT token should return a 401 error', async (done) => {
    const res = await request(app)
      .post('/users/signup')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer BadToken')
      .send({
        email: 'dude4@sschilling.com',
        password: 'password',
      });
    userId = res.body._id;
    expect(res.status).toBe(401);
    done();
  });
  it('creating a user without a valid JSON should return 401 error', async (done) => {
    const res = await request(app)
      .post('/users/signup')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer BadToken')
      .send({
        someRandomParam: '',
      });
    userId = res.body._id;
    expect(res.status).toBe(401);
    done();
  });
});

// delete a user test

describe('DELETE USER ERRORS', () => {
  it('deleting a user with a invaild user id in the URL should return 401', async (done) => {
    const res = await request(app)
      .delete('/users/345234234')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer BadToken');
    expect(res.status).toBe(401);
    done();
  });
});
