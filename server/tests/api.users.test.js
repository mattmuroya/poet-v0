const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const { resetTestDb } = require('./utils');

beforeAll(resetTestDb);

describe('user registration', () => {
  test('able to post valid user registration', async () => {
    const response = await api.post('/api/users/register')
      .send({
        screenName: 'mattmuroya',
        password: 'hunter-2'
      })
      .expect(201);
    expect(response.body.screenName).toBe('mattmuroya');
  });

  test('duplicate ScreenName rejected', async () => {
    const response = await api.post('/api/users/register')
      .send({
        screenName: 'mattmuroya',
        password: 'hunter-3'
      })
      .expect(409);
    expect(response.error.text).toBe('{"error":"ScreenName already exists."}');
  });

  test('missing ScreenName rejected', async () => {
    const response = await api.post('/api/users/register')
      .send({
        password: 'noScreenName'
      })
      .expect(400);
    expect(response.error.text).toBe('{"error":"ScreenName and password required."}');
  });

  test('missing password rejected', async () => {
    const response = await api.post('/api/users/register')
      .send({
        screenName: 'noPassword'
      })
      .expect(400);
    expect(response.error.text).toBe('{"error":"ScreenName and password required."}');
  });
});

describe('user sign on', () => {
  test('admin can log in', async () => {
    const res = await api.post('/api/users/sign-on')
      .send({
        screenName: 'admin',
        password: 'admin1234'
      })
      .expect(200)
    expect(res.body.screenName).toBe('admin');
  });
  
  test('reject wrong password', async () => {
    const res = await api.post('/api/users/sign-on')
      .send({
        screenName: 'admin',
        password: 'wrongpwd'
      })
      .expect(401);
    expect(res.error.text).toBe('{"error":"Invalid ScreenName or password."}');
  });

  test('reject invalid ScreenName', async () => {
    const res = await api.post('/api/users/sign-on')
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