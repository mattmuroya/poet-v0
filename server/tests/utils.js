const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const User = require('../models/user');

const resetTestDb = async () => {
  await User.deleteMany({});
  const response = await api.post('/api/signup')
    .send({
      username: 'admin',
      password: 'helloworld'
    });
  console.log(response.body);
};

module.exports = {
  resetTestDb
};
