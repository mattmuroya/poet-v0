const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const { resetTestDb } = require('./utils');
// const bcrypt = require('bcrypt');
// const User = require('../models/user');

beforeAll(resetTestDb);

describe('user login', () => {
  test('admin can log in', async () => {
    await api.post('/api/login')
      .send({
        username: 'admin',
        password: 'helloworld'
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  
  test('reject wrong password', async () => {
    const response = await api.post('/api/login')
      .send({
        username: 'admin',
        password: 'dlrowolleh'
      })
      .expect(401);
    expect(response.error.text).toBe('{"error":"Invalid username or password."}');
  });

  test('reject invalid username', async () => {
    const response = await api.post('/api/login')
      .send({
        username: 'idontexist',
        password: 'helloworld'
      })
      .expect(401);
    expect(response.error.text).toBe('{"error":"Invalid username or password."}');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});