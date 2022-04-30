const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const { resetTestDb } = require('./utils');
// const bcrypt = require('bcrypt');
// const User = require('../models/user');

beforeAll(resetTestDb);

describe('user sign on', () => {
  test('admin can log in', async () => {
    const res = await api.post('/api/sign-on')
      .send({
        screenName: 'admin',
        password: 'helloworld'
      })
      .expect(200)
    expect(res.body.screenName).toBe('admin');
  });
  
  test('reject wrong password', async () => {
    const res = await api.post('/api/sign-on')
      .send({
        screenName: 'admin',
        password: 'dlrowolleh'
      })
      .expect(401);
    expect(res.error.text).toBe('{"error":"Invalid ScreenName or password."}');
  });

  test('reject invalid ScreenName', async () => {
    const res = await api.post('/api/sign-on')
      .send({
        screenName: 'idontexist',
        password: 'helloworld'
      })
      .expect(401);
    expect(res.error.text).toBe('{"error":"Invalid ScreenName or password."}');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});