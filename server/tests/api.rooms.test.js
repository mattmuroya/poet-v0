const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Room = require('../models/room');
const api = supertest(app);

const User = require('../models/user');

const { resetTestDb } = require('./utils');

beforeAll(resetTestDb);

describe('getting rooms', () => {
  test('can get full list of rooms', async () => {
    const res = await api.get('/api/rooms')
      .expect(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].users).toHaveLength(2);
  });

  test('can get room by user and buddy ids', async () => {
    const user = await User.findOne({ screenName: 'admin' });
    const buddy = await User.findOne({ screenName: 'root' });
    // currently there's only one room document in the test DB.
    // may need to refactor if test DB expands in the future.
    const room = await Room.findOne({})
    const res = await api.get('/api/rooms/buddy-chat')
      .send({
        userId: user._id.toString(),
        buddyId: buddy._id.toString()
      })
      .expect(200);
    expect(res.body.id).toBe(room._id.toString());
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});