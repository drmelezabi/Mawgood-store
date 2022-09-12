import request from 'supertest';
import pool from '../../database';
import app from '../../index';
import * as externalSQL from './sqlData';

let token: string;
let id: number;

const query = {
  email: 'egy.pianit@gmail.com',
  user_name: 'dr.mez',
  first_name: 'mohamed',
  last_name: 'El_Ezabi',
  password: 'm123',
};

describe('--------------------------- Users EndPoint ---------------------------', () => {
  describe('Create new User', () => {
    it('Create new User ------------------------------------------- /api/users/', async () => {
      const result = await request(app)
        .post('/api/users/')
        .set('Content-type', 'application/json')
        .send(query)
        .expect(200);
      expect(result.body.user_name).toBe(query.user_name);
    });

    it('Login User Successfully ------------------------------ /api/users/auth/', async () => {
      const result = await request(app)
        .post('/api/users/auth')
        .set('Content-type', 'application/json')
        .send({
          email: query.email,
          password: query.password,
        })
        .expect(200);
      expect(result.body.userData.token).toBeDefined();
      token = result.body.userData.token;
      id = result.body.userData.id;
    });

    it('Login User Fail ------------------------------------- /api/users/auth/', async () => {
      const result = await request(app)
        .post('/api/users/auth')
        .set('Content-type', 'application/json')
        .send({
          email: query.email,
          password: 'wrong Password',
        })
        .expect(401);
      expect(result.body.message as string).toBe(
        'the username & password do not match please try again'
      );
    });

    it('Reset password User Successfully ------------ /api/users/resetpassword', async () => {
      const result = await request(app)
        .patch('/api/users/resetpassword')
        .set('Content-type', 'application/json')
        .send({
          email: query.email,
          password: query.password,
          newPassword: 'm12345',
        })
        .expect(200);
      expect(result.body.userData.token).toBeDefined();
      token = result.body.userData.token;
    });
  });

  it('Reset password User Fail wrong password ------- /api/users/resetpassword', async () => {
    const result = await request(app)
      .patch('/api/users/resetpassword')
      .set('Content-type', 'application/json')
      .send({
        email: query.email,
        password: 'error',
        newPassword: 'm12345',
      })
      .expect(401);
    expect(result.body.message as string).toBe(
      'the username & password do not match please try again'
    );
  });

  describe('Get EndPoints', () => {
    it('Get list of users --------------------------------------- /api/users/', async () => {
      const result = await request(app)
        .get('/api/users/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(result.body.data.length).toBeGreaterThan(0);
    });

    it('Get list of users un authentication fail------------------ /api/users/', async () => {
      const result = await request(app)
        .get('/api/users/')
        .set('Content-type', 'application/json')
        .expect(401);
      expect(result.body.message as string).toBe(
        'login Error: Please try again'
      );
    });

    it('Get user by id successfully ----------------------------- /api/users/', async () => {
      const result = await request(app)
        .get(`/api/users/${id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(result.body);
    });
    it('Get user by none existed id Fail  ----------------------- /api/users/', async () => {
      const result = await request(app)
        .get(`/api/users/500`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(result.body.data).toBeFalsy;
    });
    it('Get user by id un authentication fail Fail  ------------- /api/users/', async () => {
      const result = await request(app)
        .get(`/api/users/${id}`)
        .set('Content-type', 'application/json')
        .expect(401);
      expect(result.body.message as string).toBe(
        'login Error: Please try again'
      );
    });
  });

  describe('Update EndPoint', () => {
    it('Update user by ID successfully -------------------------- /api/users/', async () => {
      const result = await request(app)
        .patch(`/api/users/${id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ email: 'gmao.gmail.com', last_name: 'elezabi' })
        .expect(200);
      expect(result.body.last_name).toBe('elezabi');
      expect(result.body.email).toBe('gmao.gmail.com');
    });
    it('Update user without body -------------------------------- /api/users/', async () => {
      const result = await request(app)
        .patch(`/api/users/${id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
      expect(result.body.message as string).toBe('some needed data is missed');
    });
    it('Update user by ID include password change request fail -- /api/users/', async () => {
      const result = await request(app)
        .patch(`/api/users/${id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ email: 'hack.gmail.com', password: 'password' })
        .expect(405);
      expect(result.body.message as string).toBe(
        'password reset is not allowed here'
      );
    });
    it('Update user by ID un authentication fail Fail ------ /api/users/', async () => {
      const result = await request(app)
        .patch(`/api/users/${id}`)
        .set('Content-type', 'application/json')
        .send({ email: 'gmao.gmail.com', last_name: 'elezabi' })
        .expect(401);
      expect(result.body.message as string).toBe(
        'login Error: Please try again'
      );
    });
  });

  describe('Delete EndPoint', () => {
    it('Delete user by none existed id Fail  ----------------------- /api/users/', async () => {
      const result = await request(app)
        .delete(`/api/users/500`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(result.body.data).toBeFalsy;
    });
    it('Get user by id un authentication fail Fail  ------------- /api/users/', async () => {
      const result = await request(app)
        .delete(`/api/users/${id}`)
        .set('Content-type', 'application/json')
        .expect(401);
      expect(result.body.message as string).toBe(
        'login Error: Please try again'
      );
    });
    it('Get user by id successfully ----------------------------- /api/users/', async () => {
      const result = await request(app)
        .delete(`/api/users/${id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(result.body);
    });
  });

  describe('Get Best 5 Users', () => {
    beforeAll(async () => {
      const sql = `DELETE FROM users; 
        ALTER SEQUENCE users_id_seq RESTART; 
        DELETE FROM products; 
        ALTER SEQUENCE products_id_seq RESTART;
        DELETE FROM orders; 
        ALTER SEQUENCE orders_id_seq RESTART;`;
      let client = await pool.connect();
      await client.query(sql);
      client.release();
      client = await pool.connect();
      await client.query(externalSQL.sql);
      client.release();
    });

    it('Get Best 5 clients who had made a lot of purchase', async () => {
      const result = await request(app)
        .get(`/api/users/bestusers`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(result.body.data.length).toEqual(5);
    });

    afterAll(async () => {
      const sql = `DELETE FROM users; 
      ALTER SEQUENCE users_id_seq RESTART; 
      DELETE FROM products; 
      ALTER SEQUENCE products_id_seq RESTART;
      DELETE FROM orders; 
      ALTER SEQUENCE orders_id_seq RESTART;`;
      const client = await pool.connect();
      await client.query(sql);
      client.release();
    });
  });
});
