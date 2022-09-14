import pool from '../../database';
import { ItemInvoice, itemList } from '../../types/order';
import * as externalSQL from './sqlData';
import { Orders } from '../../model/order';

const orders: Orders = new Orders();

describe('--------------------------- Orders Model ---------------------------', () => {
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
  describe('Get orders', () => {
    it('Get list of orders by user ID return list of orders data objects', async () => {
      const result = await orders.getOrders(1);
      const res = result as itemList;
      expect(res.length).toEqual(4);
    });

    it(`Get list of current active user's orders by user ID return order data object`, async () => {
      const result = await orders.getCurrentOrderByUserId(1);
      const res = result as { order_id: number; items: ItemInvoice[] };
      expect(res.order_id).toEqual(16);
    });

    it(`Get list of current active user's orders by user ID return null if id is not exist`, async () => {
      const result = await orders.getCurrentOrderByUserId(1000);
      expect(result).toEqual(null);
    });

    it(`Get active user's order by user id return order data object`, async () => {
      const result = await orders.getOnProgressOrdersByUserId(1);
      const res = result as { order_id: number; items: ItemInvoice[] };
      expect(res.order_id).toEqual(16);
      expect(res.items.length).toEqual(2);
      expect(res.items[0].item_id).toEqual(22);
      expect(res.items[0].quantity).toEqual(2);
      expect(res.items[0].product_name).toEqual('HP Laptop');
      expect(res.items[1].item_id).toEqual(23);
      expect(res.items[1].quantity).toEqual(6);
      expect(res.items[1].product_name).toEqual('Harry Potter');
    });

    it(`Get active orders by user id return null if id is not exist`, async () => {
      const result = await orders.getOnProgressOrdersByUserId(1000);
      expect(result).toEqual(null);
    });

    it(`Get completed user's order by user id return order data object`, async () => {
      const result = await orders.getDoneOrdersByUserId(1);
      const res = result as { order_id: number; items: ItemInvoice[] }[];
      expect(res[0].order_id).toEqual(1);
      expect(res[1].order_id).toEqual(5);
      expect(res[2].order_id).toEqual(8);
    });

    it(`Get completed orders by user id return null if id is not exist`, async () => {
      const result = await orders.getDoneOrdersByUserId(1000);
      expect(result).toEqual(null);
    });

    //
    describe('Create orders', () => {
      it('create an order return the created order data object', async () => {
        const newOrder = { product_id: 3, quantity: 5, user_id: 4 };
        const createOrder = await orders.createOrder(newOrder);
        expect(createOrder.items[0].product_id).toEqual(3);
      });
    });

    describe('Update orders', () => {
      it('Update an order return the orders edited data object', async () => {
        const updatedOrder = await orders.updateOrderStatus('complete', 16);
        const res = updatedOrder as {
          order_id: number;
          status?: string;
          items: ItemInvoice[];
        };
        expect(res.status).toEqual('complete');
        expect(res.items.length).not.toBeFalsy;
      });
    });
    describe('Delete orders', () => {
      it('Delete an order return the deleted orders data object', async () => {
        const updatedOrder = await orders.deleteOrder(2);
        const del = updatedOrder as {
          order_id: number;
          status: string;
          items: ItemInvoice[];
        };
        expect(del.status).toBe('Deleted');
        expect(del.order_id).toEqual(2);
      });
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
