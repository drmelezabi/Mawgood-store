import { PoolClient, QueryResult } from 'pg';
import pool from '../../database';
import { Order, OrderInvoice } from '../../types/order';
import { parse } from '../../middleware/parsing';

export class Orders {
  // select all orders for a user
  async getOrders(userId: number): Promise<OrderInvoice[]> {
    try {
      const sql = `SELECT orders.id 
      as order_id , orders.quantity, orders.created_at , products.name as product_name , 
      orders.quantity * products.price as invoice, users.user_name, users.email, 
      orders.product_id, orders.status FROM orders
      INNER JOIN products ON orders.product_id = products.id 
      INNER JOIN users ON orders.user_id = users.id 
      WHERE user_id = ${userId as unknown as number}`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get all orders of user, Error: ${parse(
          err as NodeJS.ErrnoException
        )}`
      );
    }
  }

  // Get current order by user id
  async getCurrentOrderByUserId(userId: number): Promise<OrderInvoice> {
    try {
      const sql = `SELECT orders.id 
      as order_id , orders.quantity, orders.created_at , products.name as product_name , 
      orders.quantity * products.price as invoice, users.user_name, users.email, 
      orders.product_id, orders.status FROM orders
      INNER JOIN products ON orders.product_id = products.id 
      INNER JOIN users ON orders.user_id = users.id 
      WHERE user_id = ${userId} ORDER BY products.id DESC LIMIT 1`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not get current order, Error: ${parse(
          err as NodeJS.ErrnoException
        )}`
      );
    }
  }

  // Get active order by user id
  async getOnProgressOrdersByUserId(userId: number): Promise<OrderInvoice[]> {
    try {
      const sql = `SELECT orders.id 
      as order_id , orders.quantity, orders.created_at , products.name as product_name , 
      orders.quantity * products.price as invoice, users.user_name, users.email, 
      orders.product_id, orders.status FROM orders
      INNER JOIN products ON orders.product_id = products.id 
      INNER JOIN users ON orders.user_id = users.id 
      WHERE user_id = ${userId} AND status = 'on progress'`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get active order, Error: ${parse(
          err as NodeJS.ErrnoException
        )}`
      );
    }
  }

  // select completed order by user id
  async getDoneOrdersByUserId(userId: number): Promise<OrderInvoice[]> {
    try {
      const sql = `SELECT orders.id 
      as order_id , orders.quantity, orders.created_at , products.name as product_name , 
      orders.quantity * products.price as invoice, users.user_name, users.email, 
      orders.product_id, orders.status FROM orders
      INNER JOIN products ON orders.product_id = products.id 
      INNER JOIN users ON orders.user_id = users.id 
      WHERE user_id = ${userId} AND status = 'done'`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get completed orders, Error: ${parse(
          err as NodeJS.ErrnoException
        )}`
      );
    }
  }

  // create an order
  async createOrder(order: Order): Promise<OrderInvoice> {
    try {
      const { product_id, quantity, user_id } = order;
      const sql = `INSERT INTO orders (product_id, quantity, user_id, status) VALUES(${
        product_id as unknown as number
      }, ${quantity as unknown as number}, ${
        user_id as unknown as number
      }, 'on progress') RETURNING id`;
      const client: PoolClient = await pool.connect();
      let result: QueryResult = await client.query(sql);
      const getInvoice = `SELECT orders.id  as order_id , orders.quantity, orders.created_at , 
      products.name as product_name , orders.quantity * products.price as invoice, users.user_name, 
      users.email, orders.product_id, orders.status
      FROM orders
      INNER JOIN products ON orders.product_id = products.id 
      INNER JOIN users ON orders.user_id = users.id 
      WHERE orders.id = ${result.rows[0].id}`;
      result = await client.query(getInvoice);
      client.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create order, Error: ${parse(err as NodeJS.ErrnoException)}`
      );
    }
  }

  // update an order status
  async updateOrderStatus(
    status: string,
    orderId: number
  ): Promise<OrderInvoice> {
    try {
      const sql = `UPDATE orders SET status = '${status}' WHERE id = ${
        orderId as unknown as number
      } RETURNING id`;
      const client: PoolClient = await pool.connect();
      let result: QueryResult = await client.query(sql);
      const getInvoice = `SELECT orders.id as order_id , orders.quantity, orders.created_at, 
      products.name as product_name , orders.quantity * products.price as invoice, users.user_name, 
      users.email, orders.product_id, orders.status
      FROM orders
      INNER JOIN products ON orders.product_id = products.id 
      INNER JOIN users ON orders.user_id = users.id 
      WHERE orders.id = ${result.rows[0].id}`;
      result = await client.query(getInvoice);
      client.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update order status, Error: ${parse(
          err as NodeJS.ErrnoException
        )}`
      );
    }
  }

  async deleteOrder(orderId: number): Promise<Order | OrderInvoice> {
    try {
      let sql = `SELECT orders.id 
      as order_id , orders.quantity, orders.created_at , products.name as product_name , 
      orders.quantity * products.price as invoice, users.user_name, users.email, 
      orders.product_id, orders.status FROM orders
      INNER JOIN products ON orders.product_id = products.id 
      INNER JOIN users ON orders.user_id = users.id 
      WHERE orders.id = ${orderId as unknown as number}`;
      const client: PoolClient = await pool.connect();
      const inVoice: QueryResult = await client.query(sql);
      sql = `DELETE FROM orders WHERE id=${orderId} RETURNING id`;
      const result: QueryResult = await client.query(sql);
      client.release();
      if ((inVoice.rows[0] as OrderInvoice).order_id === result.rows[0].id) {
        return inVoice.rows[0];
      } else {
        return result.rows[0];
      }
    } catch (err) {
      throw new Error(
        `Could not delete order :${orderId}, Error: ${parse(
          err as NodeJS.ErrnoException
        )}`
      );
    }
  }
}
