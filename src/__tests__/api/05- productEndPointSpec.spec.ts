import request from 'supertest';
import pool from '../../database';
import app from '../../index';
import * as externalSQL from './sqlData';
import * as sec from '../../middleware/security';
import Auth from '../../types/auth';

const p_query = {
  name: 'iphone 14',
  price: '1200',
  category: 'Mobile Phones',
};

const u_query: Auth = {
  id: 40,
  email: 'auth@gmail.com',
  user_name: 'dr.mez',
  first_name: 'mohamed',
  last_name: 'El_Ezabi',
};

const token: string = sec.token(u_query);

describe('--------------------------- Product EndPoint ---------------------------', () => {
  describe('Create Product EndPoint', () => {
    it('Create New Product successfully -------------------------- /api/products/', async () => {
      const result = await request(app)
        .post(`/api/products/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(p_query)
        .expect(200);
      expect(result.body.name).toBe('iphone 14');
      expect(result.body.price).toBe('1200');
      expect(result.body.category).toBe('Mobile Phones');
    });

    it('Create New Product un authentication fail ----------------- /api/products/', async () => {
      const result = await request(app)
        .post(`/api/products/`)
        .set('Content-type', 'application/json')
        .send(p_query)
        .expect(401);
      expect(result.body.message as string).toBe(
        'login Error: Please try again'
      );
    });
  });

  //   describe('Get EndPoints', () => {
  //     it('Get list of users ---------------------------------------- /api/users/', async () => {
  //       const result = await request(app)
  //         .get('/api/products/')
  //         .set('Content-type', 'application/json')
  //         .set('Authorization', `Bearer ${token}`)
  //         .expect(200);
  //       expect(result.body.data.length).toBeGreaterThan(0);
  //     });

  //     it('Get list of users un authentication fail------------------ /api/users/', async () => {
  //       const result = await request(app)
  //         .get('/api/users/')
  //         .set('Content-type', 'application/json')
  //         .expect(401);
  //       expect(result.body.message as string).toBe(
  //         'login Error: Please try again'
  //       );
  //     });

  //     it('Get user by id successfully ----------------------------- /api/users/', async () => {
  //       const result = await request(app)
  //         .get(`/api/users/${id}`)
  //         .set('Content-type', 'application/json')
  //         .set('Authorization', `Bearer ${token}`)
  //         .expect(200);
  //       expect(result.body);
  //     });
  //     it('Get user by none existed id Fail  ----------------------- /api/users/', async () => {
  //       const result = await request(app)
  //         .get(`/api/users/500`)
  //         .set('Content-type', 'application/json')
  //         .set('Authorization', `Bearer ${token}`)
  //         .expect(200);
  //       expect(result.body.data).toBeFalsy;
  //     });
  //     it('Get user by id un authentication fail Fail  ------------- /api/users/', async () => {
  //       const result = await request(app)
  //         .get(`/api/users/${id}`)
  //         .set('Content-type', 'application/json')
  //         .expect(401);
  //       expect(result.body.message as string).toBe(
  //         'login Error: Please try again'
  //       );
  //     });
  //   });

  //   describe('Update EndPoint', () => {
  //     it('Update user by ID successfully -------------------------- /api/users/', async () => {
  //       const result = await request(app)
  //         .patch(`/api/users/${id}`)
  //         .set('Content-type', 'application/json')
  //         .set('Authorization', `Bearer ${token}`)
  //         .send({ email: 'gmao.gmail.com', last_name: 'elezabi' })
  //         .expect(200);
  //       expect(result.body.last_name).toBe('elezabi');
  //       expect(result.body.email).toBe('gmao.gmail.com');
  //     });
  //     it('Update user without body -------------------------------- /api/users/', async () => {
  //       const result = await request(app)
  //         .patch(`/api/users/${id}`)
  //         .set('Content-type', 'application/json')
  //         .set('Authorization', `Bearer ${token}`)
  //         .expect(400);
  //       expect(result.body.message as string).toBe('some needed data is missed');
  //     });
  //     it('Update user by ID include password change request fail -- /api/users/', async () => {
  //       const result = await request(app)
  //         .patch(`/api/users/${id}`)
  //         .set('Content-type', 'application/json')
  //         .set('Authorization', `Bearer ${token}`)
  //         .send({ email: 'hack.gmail.com', password: 'password' })
  //         .expect(405);
  //       expect(result.body.message as string).toBe(
  //         'password reset is not allowed here'
  //       );
  //     });
  //     it('Update user by ID un authentication fail Fail ------ /api/users/', async () => {
  //       const result = await request(app)
  //         .patch(`/api/users/${id}`)
  //         .set('Content-type', 'application/json')
  //         .send({ email: 'gmao.gmail.com', last_name: 'elezabi' })
  //         .expect(401);
  //       expect(result.body.message as string).toBe(
  //         'login Error: Please try again'
  //       );
  //     });
  //   });

  //   describe('Delete EndPoint', () => {
  //     it('Delete user by none existed id Fail  ----------------------- /api/users/', async () => {
  //       const result = await request(app)
  //         .delete(`/api/users/500`)
  //         .set('Content-type', 'application/json')
  //         .set('Authorization', `Bearer ${token}`)
  //         .expect(200);
  //       expect(result.body.data).toBeFalsy;
  //     });
  //     it('Get user by id un authentication fail Fail  ------------- /api/users/', async () => {
  //       const result = await request(app)
  //         .delete(`/api/users/${id}`)
  //         .set('Content-type', 'application/json')
  //         .expect(401);
  //       expect(result.body.message as string).toBe(
  //         'login Error: Please try again'
  //       );
  //     });
  //     it('Get user by id successfully ----------------------------- /api/users/', async () => {
  //       const result = await request(app)
  //         .delete(`/api/users/${id}`)
  //         .set('Content-type', 'application/json')
  //         .set('Authorization', `Bearer ${token}`)
  //         .expect(200);
  //       expect(result.body);
  //     });
  //   });

  //   describe('Get Best 5 Users', () => {
  //     beforeAll(async () => {
  //       const sql = `DELETE FROM users;
  //         ALTER SEQUENCE users_id_seq RESTART;
  //         DELETE FROM products;
  //         ALTER SEQUENCE products_id_seq RESTART;
  //         DELETE FROM orders;
  //         ALTER SEQUENCE orders_id_seq RESTART;`;
  //       let client = await pool.connect();
  //       await client.query(sql);
  //       client.release();
  //       client = await pool.connect();
  //       await client.query(externalSQL.sql);
  //       client.release();
  //     });

  //     it('Get Best 5 clients who had made a lot of purchase', async () => {
  //       const result = await request(app)
  //         .get(`/api/users/bestusers`)
  //         .set('Content-type', 'application/json')
  //         .set('Authorization', `Bearer ${token}`)
  //         .expect(200);
  //       expect(result.body.data.length).toEqual(5);
  //     });

  //     afterAll(async () => {
  //       const sql = `DELETE FROM users;
  //       ALTER SEQUENCE users_id_seq RESTART;
  //       DELETE FROM products;
  //       ALTER SEQUENCE products_id_seq RESTART;
  //       DELETE FROM orders;
  //       ALTER SEQUENCE orders_id_seq RESTART;`;
  //       const client = await pool.connect();
  //       await client.query(sql);
  //       client.release();
  //     });
  //   });
});
