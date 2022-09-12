import UserModel from '../../model/users';
import pool from '../../database';
import { Order, OrderInvoice } from '../../types/order';

import { Orders } from '../../model/order';
import { Product } from '../../types/product';
import User from '../../types/users';
import Products from '../../model/product';
import { PoolClient } from 'pg';

const user: UserModel = new UserModel();
const orders: Orders = new Orders();
const product: Products = new Products();

describe('--------------------------- Orders Model ---------------------------', () => {
  describe('Orders basic CRUD', () => {
    const newUser = {
      email: 'egy.pianit@gmail.com',
      user_name: 'dr.mez',
      first_name: 'mohamed',
      last_name: 'El_Ezabi',
      password: 'm123',
    } as User;

    const newProduct = {
      name: 'iphone 14',
      price: '1200',
      category: 'Mobile Phones',
    } as Product;

    const newOrder = {
      product_id: 1,
      quantity: 3,
      user_id: 1,
      status: 'Mobile Phones',
    } as Order;

    const newOrder2 = {
      product_id: 1,
      quantity: 2,
      user_id: 1,
      status: 'Mobile Phones',
    } as Order;

    beforeAll(async () => {
      const sql = `DELETE FROM users; 
      ALTER SEQUENCE users_id_seq RESTART; 
      DELETE FROM products; 
      ALTER SEQUENCE products_id_seq RESTART;
      DELETE FROM orders; 
      ALTER SEQUENCE orders_id_seq RESTART;`;
      const client = await pool.connect();
      await client.query(sql);
      client.release();
      const createUser = await user.create(newUser);
      newUser.id = createUser.id;
      const createProduct = await product.createProduct(newProduct);
      newProduct.id = createProduct.id;
      const createOrder = await orders.createOrder(newOrder);
      newOrder.id = createOrder.order_id;
      newOrder.created_at = createOrder.created_at;
    });

    describe('Get orders', () => {
      it('Get list of orders by user ID return list of orders data objects', async () => {
        const result = await orders.getOrders(1);
        expect(result.length).toEqual(1);
      });

      it(`Get list of current User's orders by user ID return order data object`, async () => {
        const result = await orders.getCurrentOrderByUserId(1);
        expect(result.product_name).toEqual('iphone 14');
      });

      it(`Get active user's order by user id return order data object`, async () => {
        const result = await orders.getOnProgressOrdersByUserId(1);
        expect(result.length).toEqual(1);
      });

      it(`Get completed orders by user id return list of orders data objects`, async () => {
        const sql = `UPDATE orders SET status = 'done' WHERE id = 1`;
        const client: PoolClient = await pool.connect();
        await client.query(sql);
        client.release();
        const result = await orders.getDoneOrdersByUserId(1);
        expect(result.length).toEqual(1);
      });
    });

    describe('Create orders', () => {
      it('create an order return the created order data object', async () => {
        const createOrder = await orders.createOrder(newOrder2);
        newOrder2.id = createOrder.order_id;
        expect(createOrder.quantity).toEqual(2);
      });
    });

    describe('Update orders', () => {
      it('Update an order return the orders edited data object', async () => {
        const updatedOrder = await orders.updateOrderStatus('done', 2);
        expect((updatedOrder as OrderInvoice).status).toBe('done');
      });
    });

    describe('Delete orders', () => {
      it('Delete an order return the deleted orders data object', async () => {
        const updatedOrder = await orders.deleteOrder(2);
        expect(updatedOrder.quantity).toBe(2);
      });
    });
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
