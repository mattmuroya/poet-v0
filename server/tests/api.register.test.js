const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const { resetTestDb } = require('./utils');
// const bcrypt = require('bcrypt');
// const User = require('../models/user');

beforeAll(resetTestDb);

describe('adding new users to the database', () => {
  test('able to post valid user registration', async () => {
    const response = await api.post('/api/register')
      .send({
        screenName: 'mattmuroya',
        password: 'hunter22'
      })
      .expect(201);
    expect(response.body.screenName).toBe('mattmuroya');
  });

  test('duplicate ScreenName rejected', async () => {
    const response = await api.post('/api/register')
      .send({
        screenName: 'mattmuroya',
        password: 'hunter33'
      })
      .expect(409);
    expect(response.error.text).toBe('{"error":"ScreenName already exists."}');
  });

  test('missing ScreenName rejected', async () => {
    const response = await api.post('/api/register')
      .send({
        password: 'noScreenName'
      })
      .expect(400);
    expect(response.error.text).toBe('{"error":"ScreenName and password required."}');
  });

  test('missing password rejected', async () => {
    const response = await api.post('/api/register')
      .send({
        screenName: 'noPassword'
      })
      .expect(400);
    expect(response.error.text).toBe('{"error":"ScreenName and password required."}');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});