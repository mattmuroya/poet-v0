const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Message = require('../models/room');
const api = supertest(app);

const Room = require('../models/room');
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


describe('getting messages', () => {

  test('can get messages', async () => {
    const room = await Room.findOne({});
    const res = await api.get('/api/messages/')
      .set({
        Authorization: `bearer ${token}`
      })
      .query({
        room: room._id.toString(),
      })
      .expect(200);
      console.log(res.body);
    //
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});