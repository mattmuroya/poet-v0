const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const { resetTestDb } = require('./utils');

beforeAll(resetTestDb);

test.only('dummy test', () => {
  expect(0).toBe(0);
})

// describe('getting rooms', () => {
//   test('can get full list of rooms', async () => {
//     const res = await api.post('/api/sign-on')
//       .send({
//         screenName: 'admin',
//         password: 'helloworld'
//       })
//       .expect(200)
//     expect(res.body.screenName).toBe('admin');
//   });
// });

afterAll(async () => {
  await mongoose.connection.close();
});