const request = require('supertest-as-promised');
const app = require('../server');


describe('User', () => {
  describe('GET => /users', () => {
    it('Should return an array with the users', async () => {
      const res = await request(app).get('/api/users');
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchSnapshot();
    });
  });

  describe('POST => /users', () => {
    it('Should create a user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          username: 'joaozinho',
          password: '1234',
          name: 'João',
          type: 'ADMIN'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body).toMatchSnapshot();
    });
  });

  describe('GET => /users/{username}', () => {
    it('Should get a specific user', async () => {
      const res = await request(app).get('/api/users/joaozinho');
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchSnapshot();
    });
  });

  describe('PUT => /users/{username}', () => {
    it('Should update a specific user', async () => {
      const res = await request(app)
        .put('/api/users/joaozinho')
        .send({ name: 'Little John' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchSnapshot();
    });
  });

  describe('DELETE => /users/{username}', () => {
    it('Should delete a specific user', async () => {
      const res = await request(app).delete('/api/users/joaozinho');
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchSnapshot();
    });
  });
});
