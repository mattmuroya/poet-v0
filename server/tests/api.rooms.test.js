const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const { resetTestDb } = require('./utils');

beforeAll(resetTestDb);

test('dummy test', () => {
  expect(0).toBe(0);
})

describe('getting rooms', () => {
  test('can get full list of rooms', async () => {
    const res = await api.get('/api/rooms')
      .expect(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].users).toHaveLength(2);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});