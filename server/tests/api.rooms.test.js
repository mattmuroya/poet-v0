const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Room = require('../models/room');
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

  const res2 = await api.post('/api/users/sign-on')
    .send({
      screenName: 'root',
      password: 'root1234'
    });
  tokenWrongUser = res2.body.token;
});


describe('getting rooms', () => {

  test('can get room by user and buddy ids', async () => {
    const user = await User.findOne({ screenName: 'admin' });
    const buddy = await User.findOne({ screenName: 'root' });
    // currently there's only one room document in the test DB.
    // may need to refactor if test DB expands in the future.
    const room = await Room.findOne({})
    const res = await api.get('/api/rooms/')
      .set({
        Authorization: `bearer ${token}`
      })
      .query({
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