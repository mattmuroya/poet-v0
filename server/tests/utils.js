const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const User = require('../models/user');

const resetTestDb = async () => {
  await User.deleteMany({});
  const admin = await api.post('/api/register')
    .send({
      screenName: 'admin',
      password: 'admin1234'
    });
  const root = await api.post('/api/register')
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
};

module.exports = {
  resetTestDb
};
