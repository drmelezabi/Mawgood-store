import request from 'supertest';
import pool from '../../database';
import app from '../../index';
import * as externalSQL from './sqlData';
import * as sec from '../../middleware/security';
import Auth from '../../types/auth';
import { Product } from '../../types/product';

const p_query = {
  name: 'iphone 14',
  price: '1200',
  category: 'Mobile Phones',
} as Product;

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
      p_query.id = result.body.id;
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

    it('Create New Product without body fail-------------------------- /api/products/', async () => {
      const result = await request(app)
        .post(`/api/products/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
      expect(result.body.message as string).toBe('some needed data is missed');
    });
  });

  describe('Get EndPoints', () => {
    it('Get list of products ---------------------------------------- /api/users/', async () => {
      const result = await request(app)
        .get('/api/products/')
        .set('Content-type', 'application/json')
        .expect(200);
      expect(result.body.length).toBeGreaterThan(0);
    });

    it('Get list of products by Category return list of products objects-- /api/users/', async () => {
      const result = await request(app)
        .get(`/api/products/cat/${p_query.category}`)
        .set('Content-type', 'application/json')
        .expect(200);
      expect(result.body.length).toBeGreaterThan(0);
    });

    it('Get list of products by Category  return list return empty list-- /api/users/', async () => {
      const result = await request(app)
        .get(`/api/products/cat/nocategoryfound`)
        .set('Content-type', 'application/json')
        .expect(200);
      expect(result.body.length).toEqual(0);
    });

    it('Get Product by ID return product data ogject ------------- /api/users/', async () => {
      const result = await request(app)
        .get(`/api/products/${p_query.id}`)
        .set('Content-type', 'application/json')
        .expect(200);
      expect(result.body.price).toBe('1200');
    });

    it('Get Product by ID retun empty list when id is not exist -- /api/users/', async () => {
      const result = await request(app)
        .get(`/api/products/550`)
        .set('Content-type', 'application/json')
        .expect(200);
      expect(result.body).toBeFalsy;
    });
  });

  describe('Update EndPoint', () => {
    it('Update Product by ID successfully return edited product data - /api/Products/', async () => {
      const result = await request(app)
        .patch(`/api/products/${p_query.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ price: '1500' })
        .expect(200);
      expect(result.body.price).toBe('1500');
    });

    it('Update Product by ID without body fail---------------------- /api/Products/', async () => {
      const result = await request(app)
        .patch(`/api/products/${p_query.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
      expect(result.body.message as string).toBe('some needed data is missed');
    });

    it('Update Product by ID un authentication fail ---------------- /api/Products/', async () => {
      const result = await request(app)
        .patch(`/api/products/${p_query.id}`)
        .set('Content-type', 'application/json')
        .send({ price: '1500' })
        .expect(401);
      expect(result.body.message as string).toBe(
        'login Error: Please try again'
      );
    });
  });

  describe('Delete EndPoint', () => {
    it('Delete user by none existed id Fail  ----------------------- /api/products/', async () => {
      const result = await request(app)
        .delete(`/api/products/500`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(result.body.data).toBeFalsy;
    });
    it('Get user by id un authentication fail Fail  ------------- /api/products/', async () => {
      const result = await request(app)
        .delete(`/api/products/${p_query.id}`)
        .set('Content-type', 'application/json')
        .expect(401);
      expect(result.body.message as string).toBe(
        'login Error: Please try again'
      );
    });
    it('Get user by id successfully ----------------------------- /api/products/', async () => {
      const result = await request(app)
        .delete(`/api/products/${p_query.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(result.body.name).toBe('iphone 14');
      expect(result.body.price).toBe('1500');
      expect(result.body.category).toBe('Mobile Phones');
    });
  });

  describe('Get Best 5 products', () => {
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

    it('Get 5 best seller projects return most product selling products', async () => {
      const result = await request(app)
        .get(`/api/products/bestsellers`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(result.body.data.length).toEqual(5);
      expect(result.body.data[0].name).toBe('HP Laptop');
      expect(result.body.data[1].name).toBe('chair cover');
      expect(result.body.data[2].name).toBe('Fan');
      expect(result.body.data[3].name).toBe('samsung Galaxy Note 10');
      expect(result.body.data[4].name).toBe('Kindle Paper white gen 7 8gb');
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
});
