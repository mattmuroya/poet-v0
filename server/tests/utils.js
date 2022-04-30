const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const User = require('../models/user');

const resetTestDb = async () => {
  await User.deleteMany({});
  await api.post('/api/register')
    .send({
      screenName: 'admin',
      password: 'helloworld'
    });
};

module.exports = {
  resetTestDb
};
