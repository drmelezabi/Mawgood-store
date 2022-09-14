import { PoolClient, QueryResult } from 'pg';
import pool from '../../database';
import { ItemInvoice, Order, ordersList } from '../../types/order';
import { parse } from '../../middleware/parsing';

export class Orders {
  // select all orders for a user
  async getOrders(userId: number): Promise<ordersList | null> {
    try {
      const sql = `SELECT orders.id as id FROM orders WHERE user_id = ${
        userId as unknown as number
      }`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();
      const ordersArray: { id: number }[] = result.rows;
      if (result.rowCount > 0) {
        const finalResult: ordersList = [];
        for (let i = 0; i < ordersArray.length; i++) {
          const orderId = ordersArray[i].id;
          const sql = `SELECT orders.id as item_id, order_products.created_at, order_products.quantity, products.name as product_name, 
          order_products.quantity * products.price as invoice, products.id as product_id , orders.status
          FROM order_products
            INNER JOIN products ON order_products.product_id = products.id
            INNER JOIN orders ON order_products.order_id = orders.id 
            WHERE order_products.order_id = ${orderId} ORDER BY order_products.created_at ASC`;
          const clients: PoolClient = await pool.connect();
          const results: QueryResult = await clients.query(sql);
          client.release();
          const list: ItemInvoice[] = results.rows;
          finalResult.push({ order_id: orderId, items: list });
        }
        return finalResult;
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(
        `Could not get all orders of user, Error: ${parse(
          err as NodeJS.ErrnoException
        )}`
      );
    }
  }

  // Get current order by user id
  async getCurrentOrderByUserId(
    userId: number
  ): Promise<{ order_id: number; items: ItemInvoice[] } | null> {
    try {
      const sql = `SELECT orders.id as id FROM orders WHERE user_id = ${
        userId as unknown as number
      } AND status = 'active' ORDER BY id DESC LIMIT 1`;
      const client: PoolClient = await pool.connect();
      const results: QueryResult = await client.query(sql);
      client.release();
      if (results.rowCount > 0) {
        const ordersArray = results.rows;
        const orderId = parseInt(ordersArray[0].id);
        const sql = `SELECT order_products.id as item_id, order_products.created_at, order_products.quantity, products.name as product_name, 
          order_products.quantity * products.price as invoice, products.id as product_id
          FROM order_products
            INNER JOIN products ON order_products.product_id = products.id
            INNER JOIN orders ON order_products.order_id = orders.id 
            WHERE order_products.order_id = ${orderId} ORDER BY order_products.id DESC`;
        const client: PoolClient = await pool.connect();
        const result: QueryResult = await client.query(sql);
        client.release();
        const res = {
          order_id: orderId as number,
          items: result.rows as ItemInvoice[],
        };
        return res;
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(
        `Could not get all orders of user, Error: ${parse(
          err as NodeJS.ErrnoException
        )}`
      );
    }
  }

  // Get active order by user id
  async getOnProgressOrdersByUserId(
    userId: number
  ): Promise<{ order_id: number; items: ItemInvoice[] } | null> {
    try {
      const sql = `SELECT orders.id as id FROM orders WHERE user_id = ${
        userId as unknown as number
      } AND status = 'active'`;
      const client: PoolClient = await pool.connect();
      const results: QueryResult = await client.query(sql);
      client.release();
      if (results.rowCount > 0) {
        const ordersArray = results.rows;
        const orderId = parseInt(ordersArray[0].id);
        const sql = `SELECT order_products.id as item_id, order_products.created_at, order_products.quantity, products.name as product_name, 
          order_products.quantity * products.price as invoice, products.id as product_id
          FROM order_products
            INNER JOIN products ON order_products.product_id = products.id
            INNER JOIN orders ON order_products.order_id = orders.id 
            WHERE order_products.order_id = ${orderId}  ORDER BY order_products.id ASC`;
        const client: PoolClient = await pool.connect();
        const result: QueryResult = await client.query(sql);
        client.release();
        const list: ItemInvoice[] = result.rows;
        return { order_id: orderId, items: list };
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(
        `Could not get all orders of user, Error: ${parse(
          err as NodeJS.ErrnoException
        )}`
      );
    }
  }

  // select completed order by user id
  async getDoneOrdersByUserId(
    userId: number
  ): Promise<{ order_id: number; items: ItemInvoice[] }[] | null> {
    try {
      const sql = `SELECT orders.id as id FROM orders WHERE user_id = ${
        userId as unknown as number
      } AND status = 'complete'`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();
      const ordersArray = result.rows;
      if (result.rows.length > 0) {
        const finalResult: { order_id: number; items: ItemInvoice[] }[] = [];
        for (let i = 0; i < ordersArray.length; i++) {
          const orderId = parseInt(ordersArray[i].id);
          const sql = `SELECT order_products.id as item_id, order_products.created_at, order_products.quantity, products.name as product_name, 
          order_products.quantity * products.price as invoice, products.id as product_id , orders.status
          FROM order_products
            INNER JOIN products ON order_products.product_id = products.id
            INNER JOIN orders ON order_products.order_id = orders.id 
            WHERE order_products.order_id = ${orderId} ORDER BY order_products.created_at ASC`;
          const client: PoolClient = await pool.connect();
          const result: QueryResult = await client.query(sql);
          client.release();
          const list: ItemInvoice[] = result.rows;

          finalResult.push({ order_id: orderId, items: list });
        }
        return finalResult;
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(
        `Could not get all orders of user, Error: ${parse(
          err as NodeJS.ErrnoException
        )}`
      );
    }
  }
  // create an order with project
  async createOrder(
    order: Order
  ): Promise<{ order_id: number; items: ItemInvoice[] }> {
    try {
      const { product_id, quantity, user_id } = order;
      const sql = `INSERT INTO orders (user_id, status) VALUES(${
        user_id as unknown as number
      }, 'active') RETURNING id`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      const orederID = result.rows[0].id;
      const sql2 = `INSERT INTO order_products (order_id, product_id, quantity) VALUES(${
        orederID as unknown as number
      }, ${product_id as unknown as number}, ${quantity as unknown as number})`;
      await client.query(sql2);
      const sql3 = `SELECT order_products.id as item_id, order_products.created_at, order_products.quantity, products.name as product_name, 
          order_products.quantity * products.price as invoice, products.id as product_id
          FROM order_products
            INNER JOIN products ON order_products.product_id = products.id
            INNER JOIN orders ON order_products.order_id = orders.id 
            WHERE order_products.order_id = ${orederID} ORDER BY order_products.created_at ASC`;
      const result2: QueryResult = await client.query(sql3);
      client.release();
      const lists: ItemInvoice[] = [
        {
          item_id: result2.rows[0].item_id,
          created_at: result2.rows[0].created_at,
          quantity: result2.rows[0].quantity,
          product_name: result2.rows[0].product_name,
          invoice: result2.rows[0].invoice,
          product_id: result2.rows[0].product_id,
        },
      ];

      return { order_id: orederID, items: lists };
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
  ): Promise<{
    order_id: number;
    status?: string;
    items: ItemInvoice[];
  } | null> {
    try {
      const sql = `UPDATE orders SET status = '${status}' WHERE id = ${
        orderId as unknown as number
      } RETURNING id,status, created_at`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();
      const ordersArray: { id: number; status: string; created_at: string } =
        result.rows[0];

      if (result.rowCount !== 0) {
        const sql = `SELECT order_products.id as item_id, order_products.created_at, order_products.quantity, products.name as product_name, 
          order_products.quantity * products.price as invoice, products.id as product_id
          FROM order_products
          INNER JOIN products ON order_products.product_id = products.id
          INNER JOIN orders ON order_products.order_id = orders.id 
          WHERE order_products.order_id = ${orderId} ORDER BY order_products.id ASC`;
        const client: PoolClient = await pool.connect();
        const results: QueryResult = await client.query(sql);
        client.release();
        const list = results.rows as ItemInvoice[];

        return {
          order_id: orderId,
          status: ordersArray.status as string,
          items: list,
        };
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(
        `Could not update order status, Error: ${parse(
          err as NodeJS.ErrnoException
        )}`
      );
    }
  }

  async deleteOrder(orderId: number): Promise<{
    order_id: number;
    status: string;
    items: ItemInvoice[];
  } | null> {
    try {
      const sql = `SELECT order_products.id as item_id, order_products.created_at, order_products.quantity, products.name as product_name, 
        order_products.quantity * products.price as invoice, products.id as product_id , orders.status
        FROM order_products
          INNER JOIN products ON order_products.product_id = products.id
          INNER JOIN orders ON order_products.order_id = orders.id 
          WHERE order_products.order_id = ${orderId} ORDER BY order_products.created_at ASC`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();
      const list: ItemInvoice[] = result.rows;
      if (list.length > 0) {
        const sql = `DELETE FROM order_products WHERE order_id = ${orderId};
        DELETE FROM orders WHERE id = ${orderId}`;
        const client: PoolClient = await pool.connect();
        await client.query(sql);
        client.release();
        return { order_id: orderId, status: 'Deleted', items: list };
      } else {
        return null;
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
