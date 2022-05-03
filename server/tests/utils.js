const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const User = require('../models/user');
const Room = require('../models/room');

const resetTestDb = async () => {
  await User.deleteMany({});
  await Room.deleteMany({});

  const admin = await api.post('/api/users/register')
    .send({
      screenName: 'admin',
      password: 'admin1234'
    });

  const root = await api.post('/api/users/register')
    .send({
      screenName: 'root',
      password: 'root1234'
    });

  await User.findByIdAndUpdate(admin.body.id, {
    // automatically converts to ObjectId type
    $push: { 'buddyList': root.body.id }
  });

  await User.findByIdAndUpdate(root.body.id,
    { $push:
      { 'buddyList': admin.body.id }
    }
  );

  await api.post('/api/rooms')
    .send({
      users: [
        admin.body.id,
        root.body.id
      ]
    });
};

module.exports = {
  resetTestDb
};
