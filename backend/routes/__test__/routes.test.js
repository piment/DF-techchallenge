const request = require('supertest');
const app = require('../../app.js');

describe('Testing API routes', () => {
  it('Should return status code 200 on / get request', async () => {
    const res = await request(app).get('/');
    expect(res.status).toEqual(200);
  });

  it('Should return status code 200 on /todo get request, and an object for response', async () => {
    const res = await request(app).get('/todo');
    expect(res.status).toEqual(200);
  });

  it('Should return status code 201 on /todo post request if todo object is passed', async () => {
    const res = await request(app)
      .post('/todo')
      .send({ id: 0, title: 'first todo', desc: 'todo description' });
    expect(res.status).toEqual(201);
  });
});
