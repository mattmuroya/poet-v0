const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Message = require('../models/room');
const api = supertest(app);

const User = require('../models/user');

const { resetTestDb } = require('./utils');

beforeAll(resetTestDb);

let token, tokenWrongUser;

beforeAll(async () => {
  const res = await api.post('/api/users/sign-on')
    .send({
      screenName: 'admin',
      password: 'admin1234'
    });
  token = res.body.token;

  console.log('token: ', token)

  const res2 = await api.post('/api/users/sign-on')
    .send({
      screenName: 'root',
      password: 'root1234'
    });
  tokenWrongUser = res2.body.token;
});


describe('test', () => {

  test('test', async () => {
    expect(1+1).toBe(2);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});