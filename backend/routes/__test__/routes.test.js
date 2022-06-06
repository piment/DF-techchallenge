const request = require('supertest');
const app = require('../../app.js');

describe('Testing API routes', () => {
  it('Should return status code 200 on / get request', async () => {
    const res = await request(app).get('/api');
    expect(res.status).toEqual(200);
  });

  it('Should return status code 200 on /todo get request, and an object for response', async () => {
    const res = await request(app).get('/api/todo');
    expect(res.status).toEqual(200);
    expect(typeof res.body).toEqual('object');
  });

  it('Should return status code 201 on /todo post request if todo object is passed', async () => {
    const res = await request(app).post('/api/todo').send({
      title: 'first todo',
      desc: 'todo description',
      category: 'home',
    });
    expect(res.status).toEqual(201);
    expect(typeof res.body).toEqual('object');
    expect(res.body.id !== undefined).toEqual(true);
  });
});
