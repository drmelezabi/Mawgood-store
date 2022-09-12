// import request from 'supertest';
// import app from '../index';

// describe('GET /convert', () => {
//   it('responds with 400 if fetch without parameters', async () => {
//     const query = {
//       email: 'egy.pianit99@gmail.com',
//       user_name: 'Dr.mez',
//       first_name: 'mohamed',
//       last_name: 'El_Ezabi',
//       password: 'm123',
//     };
//     request(app)
//       .post('/api/users/')
//       //   .set('Content-type', 'application/json')
//       .send(query)
//       .expect(200);
//   });
//   //   it('responds with 400 if fetch with a missing parameter', async () => {
//   //     const result = await request(app).get('/convert?filename=ooo&height=100');
//   //     expect(result.status).toBe(400);
//   //   });
//   //   it('responds with 404 if fetch correctly but image does not exist', async () => {
//   //     const result = await request(app).get(
//   //       '/convert?filename=NoImg&height=100&width=100'
//   //     );
//   //     expect(result.status).toBe(404);
//   //   });
//   //   it('responds with 200 if fetch correctly and image exist', async () => {
//   //     const result = await request(app).get(
//   //       '/convert?filename=ooo&height=100&width=100'
//   //     );
//   //     expect(result.status).toBe(200);
//   //   });
//   //   it('responds with 200 if fetch correctly and image is new', async () => {
//   //     const result = await request(app).get(
//   //       '/convert?filename=ooo&height=150&width=150'
//   //     );
//   //     expect(result.status).toBe(200);
//   //   });
// });
