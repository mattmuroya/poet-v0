const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const User = require('../models/user');
const Room = require('../models/room');
const Message = require('../models/message');
const { info } = require('../utils/info');

const resetTestDb = async () => {
  await Message.deleteMany({});
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

  const test = await api.post('/api/users/register')
    .send({
      screenName: 'test',
      password: 'test1234'
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

  //=====
     
  const res = await api.post('/api/users/sign-on')
    .send({
      screenName: 'admin',
      password: 'admin1234'
    });
    
  const token = res.body.token;

  const room = await api.post('/api/rooms')
    .set({
      Authorization: `bearer ${token}`
    })
    .send({
      users: [
        admin.body.id,
        root.body.id
      ]
    });
  
  await api.post('/api/messages')
    .set({
      Authorization: `bearer ${token}`
    })
    .send({
      author: admin.body.id,
      room: room.body.id,
      text: 'this is an existing messages',
      timestamp: 'Fri May 01 2022 18:00:00 GMT-1000 (Hawaii-Aleutian Standard Time)'
    });
};

const reset = async () => {
  await resetTestDb();
  await require('mongoose').connection.close();
  info('test Db reset complete')
}

module.exports = {
  resetTestDb,
  reset
};
