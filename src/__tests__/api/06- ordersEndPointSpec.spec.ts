import request from 'supertest';
import pool from '../../database';
import * as externalSQL from './sqlData';
import app from '../../index';
import * as sec from '../../middleware/security';
import Auth from '../../types/auth';
import { Order } from '../../types/order';

// const product: Products = new Products();

const newOrder = {
  product_id: 1,
  quantity: 3,
  user_id: 1,
} as Order;

const u_query: Auth = {
  id: 40,
  email: 'auth@gmail.com',
  user_name: 'dr.mez',
  first_name: 'mohamed',
  last_name: 'El_Ezabi',
};

const token: string = sec.token(u_query);

describe('--------------------------- Orders EndPoint ---------------------------', () => {
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
  describe('Create Product EndPoint', () => {
    it('Create New Product successfully -------------------------- /api/orders/', async () => {
      await request(app)
        .post(`/api/orders/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(newOrder)
        .expect(200);
    });
    it('Create New Product un authentication fail --------------- /api/orders/', async () => {
      const result = await request(app)
        .post(`/api/orders/`)
        .set('Content-type', 'application/json')
        .send(newOrder)
        .expect(401);
      expect(result.body.message as string).toBe(
        'login Error: Please try again'
      );
    });
    it('Create New Product without body fail --------------------- /api/orders/', async () => {
      await request(app)
        .post(`/api/orders/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
    });
  });
  describe('Update Product EndPoint', () => {
    it('Update New Product successfully -------------------------- /api/orders/:user_id', async () => {
      await request(app)
        .patch(`/api/orders/10`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'complete',
        })
        .expect(200);
    });
    it('Update New Product un authentication fail --------------- /api/orders/:user_id', async () => {
      const result = await request(app)
        .patch(`/api/orders/10`)
        .set('Content-type', 'application/json')
        .send({ status: 'active' })
        .expect(401);
      expect(result.body.message as string).toBe(
        'login Error: Please try again'
      );
    });
    it('Update New Product without body fail --------------------- /api/orders/:user_id', async () => {
      await request(app)
        .patch(`/api/orders/10`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
    });
  });
  describe('Get Product EndPoint', () => {
    it('Get Current Product by user ID successfully ----- /api/orders/current/:user_id', async () => {
      await request(app)
        .get(`/api/orders/current/1`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      //   expect(result.body.order_id).toEqual(1);
    });
    it('Get Current Product by user ID un authentication fail -- /api/orders/current/:user_id', async () => {
      const result = await request(app)
        .get(`/api/orders/current/1`)
        .set('Content-type', 'application/json')
        .expect(401);
      expect(result.body.message as string).toBe(
        'login Error: Please try again'
      );
    });
    it('Get Current Product by user ID without body fail ------ /api/orders/current/:user_id', async () => {
      const result = await request(app)
        .get(`/api/orders/current/1`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(result.body.data).toBeFalsy;
    });
    it('Get compeleted Product by user ID successfully ------------------- /api/orders/done/:user_id', async () => {
      await request(app)
        .get(`/api/orders/done/1`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
    it('Get compeleted Product by user ID un authentication fail --------- /api/orders/done/:user_id', async () => {
      const result = await request(app)
        .get(`/api/orders/done/1`)
        .set('Content-type', 'application/json')
        .expect(401);
      expect(result.body.message as string).toBe(
        'login Error: Please try again'
      );
    });
    it('Get compeleted Product by user ID without body fail ------------- /api/orders/done/:user_id', async () => {
      const result = await request(app)
        .get(`/api/orders/done/1`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(result.body.data).toBeFalsy;
    });
    // ///
    it('Get on progress Product by user ID successfully ------------- /api/orders/onprogress/:user_id', async () => {
      await request(app)
        .patch(`/api/orders/1`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ status: 'on progress' });
      await request(app)
        .get(`/api/orders/onprogress/1`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
    it('Get on progress Product by user ID un authentication fail -- /api/orders/onprogress/:user_id', async () => {
      const result = await request(app)
        .get(`/api/orders/onprogress/1`)
        .set('Content-type', 'application/json')
        .expect(401);
      expect(result.body.message as string).toBe(
        'login Error: Please try again'
      );
    });
    it('Get on progress Product by user ID without body fail ------- /api/orders/onprogress/:user_id', async () => {
      const result = await request(app)
        .get(`/api/orders/onprogress/1`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(result.body.data).toBeFalsy;
    });
    // /////
    it('Delete on progress Product by user ID un authentication fail -------------- /api/orders/:user_id', async () => {
      const result = await request(app)
        .delete(`/api/orders/1`)
        .set('Content-type', 'application/json')
        .expect(401);
      expect(result.body.message as string).toBe(
        'login Error: Please try again'
      );
    });
    it('Delete on progress Product by user ID successfully ------------------------ /api/orders/:user_id', async () => {
      await request(app)
        .delete(`/api/orders/1`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
  });
  afterAll(async () => {
    const sql = `DELETE FROM order_products; 
    ALTER SEQUENCE order_products_id_seq RESTART;
    DELETE FROM orders; 
    ALTER SEQUENCE orders_id_seq RESTART;
    DELETE FROM products; 
    ALTER SEQUENCE products_id_seq RESTART;
    DELETE FROM users; 
    ALTER SEQUENCE users_id_seq RESTART; 
    `;
    const client = await pool.connect();
    await client.query(sql);
    client.release();
  });
});
