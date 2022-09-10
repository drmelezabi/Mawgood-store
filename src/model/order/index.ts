import { PoolClient, QueryResult } from 'pg';
import pool from '../../database';
import { Order } from '../../types/order';
import { parse } from '../../middleware/parsing';

export class Orders {
  // select all orders for a user
  async getOrders(userId: string): Promise<Order[]> {
    try {
      const sql = `SELECT * FROM orders WHERE user_id='${userId}'`;
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
  async getCurrentOrderByUserId(userId: string): Promise<Order> {
    try {
      const sql = `SELECT * FROM orders WHERE user_id = '${userId}' ORDER BY id DESC LIMIT 1`;
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
  async getOnProgressOrdersByUserId(userId: string): Promise<Order[]> {
    try {
      const sql = `SELECT * FROM orders WHERE user_id = '${userId}' AND status = 'On progress'`;
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
  async getDoneOrdersByUserId(userId: string): Promise<Order[]> {
    try {
      const sql = `SELECT * FROM orders WHERE user_id = '${userId}' AND status = 'Done'`;
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
  async createOrder(order: Order): Promise<Order> {
    try {
      const { product_id, quantity, user_id, status } = order;
      const sql = `INSERT INTO orders (product_id, quantity, user_id, status) VALUES('${product_id}', ${quantity}, '${user_id}', '${status}') RETURNING *`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create order, Error: ${parse(err as NodeJS.ErrnoException)}`
      );
    }
  }

  // update an order
  async updateOrderStatus(status: string, orderId: string): Promise<Order> {
    try {
      const sql = `UPDATE orders SET status='${status}' WHERE id='${orderId}' RETURNING *`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
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

  async deleteOrder(orderId: string): Promise<Order> {
    try {
      const sql = `DELETE FROM orders WHERE id='${orderId}' RETURNING *`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not delete order :${orderId}, Error: ${parse(
          err as NodeJS.ErrnoException
        )}`
      );
    }
  }
}
