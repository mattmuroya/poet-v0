const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const { resetTestDb } = require('./utils');
const bcrypt = require('bcrypt');
const User = require('../models/user');

beforeAll(resetTestDb);

describe('adding new users to the database', () => {
  test('able to post valid user signup', async () => {
    const response = await api.post('/api/signup')
      .send({
        username: 'mattmuroya',
        password: 'hunter22'
      })
      .expect(201);
    expect(response.body.username).toBe('mattmuroya');
  });

  test('duplicate username rejected', async () => {
    const response = await api.post('/api/signup')
      .send({
        username: 'mattmuroya',
        password: 'hunter33'
      })
      .expect(409);
    console.log(response.error);
    expect(response.error.text).toBe('{"error":"Username already exists."}');
  });

  test('missing username rejected', async () => {
    const response = await api.post('/api/signup')
      .send({
        password: 'noUsername'
      })
      .expect(400);
    expect(response.error.text).toBe('{"error":"Username and password required."}');
  });

  test('missing password rejected', async () => {
    const response = await api.post('/api/signup')
      .send({
        username: 'noPassword'
      })
      .expect(400);
    expect(response.error.text).toBe('{"error":"Username and password required."}');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});