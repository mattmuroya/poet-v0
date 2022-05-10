const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Message = require('../models/message');
const api = supertest(app);

const Room = require('../models/room');

const { resetTestDb } = require('./utils');

beforeAll(resetTestDb);

let token, token2;

beforeAll(async () => {
  const res = await api.post('/api/users/sign-on')
    .send({
      screenName: 'admin',
      password: 'admin1234'
    });
  token = res.body.token;

  const res2 = await api.post('/api/users/sign-on')
    .send({
      screenName: 'root',
      password: 'root1234'
    });
  token2 = res2.body.token;
});


describe('getting messages', () => {
  test('can get messages based on room id', async () => {
    const room = await Room.findOne({});
    await api.get('/api/messages/')
      .set({
        Authorization: `bearer ${token}`
      })
      .query({
        room: room._id.toString(),
      })
      .expect(200);
    //
  });

  test('get messages fails with invalid token', async () => {
    const room = await Room.findOne({});
    await api.get('/api/messages/')
      .set({
        Authorization: `bearer BADTOKEN`
      })
      .query({
        room: room._id.toString(),
      })
      .expect(401);
    //
  });
});

describe('posting messages', () => {
  test('can post new messages to the DB', async () => {
    const room = await Room.findOne({});
    await api.post('/api/messages/')
      .set({
        Authorization: `bearer ${token}`
      })
      .send({
        text: 'message from test file',
        room: room._id
      })
      .expect(201);

    const messagesFromDb = await Message.find({});
    expect(messagesFromDb).toHaveLength(2);
  });

  test('second user can post new messages to the DB', async () => {
    const room = await Room.findOne({});
    await api.post('/api/messages/')
      .set({
        Authorization: `bearer ${token2}`
      })
      .send({
        text: 'second user message from test file',
        room: room._id
      })
      .expect(201);
  });

  test('post message fails with invalid token', async () => {
    const room = await Room.findOne({});
    await api.post('/api/messages/')
      .set({
        Authorization: `bearer BADTOKEN`
      })
      .send({
        text: 'second user message from test file',
        room: room._id
      })
      .expect(401);
  });
})

afterAll(async () => {
  await mongoose.connection.close();
});