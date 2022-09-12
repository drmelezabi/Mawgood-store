import { PoolClient, QueryResult } from 'pg';
import pool from '../../database';
import { Product } from '../../types/product';
import { parse } from '../../middleware/parsing';

class Products {
  // select all products
  async getProducts(): Promise<Product[]> {
    try {
      const sql = `SELECT * FROM products`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();
      return result.rows;
    } catch (err) {
      throw Error(
        `Could not get all products. Error: ${parse(
          err as NodeJS.ErrnoException
        )}`
      );
    }
  }

  // select product by id
  async getProductById(productId: number): Promise<Product> {
    try {
      const sql = `SELECT * FROM products WHERE id=${productId}`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not get product by id. Error: ${parse(
          err as NodeJS.ErrnoException
        )}`
      );
    }
  }

  // select product by category
  async getProductByCat(category: string): Promise<Product[]> {
    try {
      const sql = `SELECT * FROM products WHERE category='${category}'`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get product by category. Error: ${parse(
          err as NodeJS.ErrnoException
        )}`
      );
    }
  }

  // create product
  async createProduct(product: Product): Promise<Product> {
    try {
      const { name, price, category } = product;
      const sql = `INSERT INTO products (name, price, category) VALUES('${name}', ${price}, '${category}') RETURNING *`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create product. Error: ${parse(
          err as NodeJS.ErrnoException
        )}`
      );
    }
  }

  // update Product
  async updateProducts(id: number, p: string): Promise<Product> {
    try {
      const sql = `UPDATE products SET ${p} WHERE id = ${id} RETURNING *`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not Update product ${id}. Error: ${parse(
          err as NodeJS.ErrnoException
        )}`
      );
    }
  }

  // delete product
  async deleteProduct(id: number): Promise<Product> {
    try {
      const sql = `DELETE FROM products WHERE id=${id} RETURNING *`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not delete product ${id}. Error: ${parse(
          err as NodeJS.ErrnoException
        )}`
      );
    }
  }
  // get best sellers 5
  async get5BestSellers(): Promise<object[]> {
    try {
      const bestIDs = [];
      const sql = `SELECT product_id FROM orders GROUP BY product_id ORDER BY count(*) DESC LIMIT 5`;

      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      for (let i = 0; i < result.rows.length; i++) {
        const sql = `SELECT id, name FROM products WHERE id= ${result.rows[i].product_id}`;
        const best: QueryResult = await client.query(sql);
        bestIDs.push(best.rows[0]);
      }
      client.release();
      return bestIDs;
    } catch (error) {
      throw new Error(`Unable to get users: ${error}`);
    }
  }
}

export default Products;
