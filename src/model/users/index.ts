import { PoolClient, QueryResult } from 'pg';
import User from '../../types/users';
import pool from '../../database';
import { hash, isValid } from '../../middleware/security';
import { parse } from '../../middleware/parsing';

class UserModel {
  // Create new user account
  async create(request: User): Promise<User> {
    try {
      const sql = `INSERT INTO users (email, user_name, first_name, last_name, password) VALUES ('${
        request.email
      }', '${request.user_name}', '${request.first_name}', '${
        request.last_name
      }', '${hash(
        request.password
      )}') returning email,user_name, first_name, last_name`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create ${request.user_name} account: ${
          (error as Error).message
        }`
      );
    }
  }
  // Return user {without passwords}
  async getUser(id: string): Promise<User> {
    try {
      const sql = `SELECT email,user_name, first_name, last_name FROM users WHERE id = '${id}'`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to get users: ${error}`);
    }
  }

  // get all user
  async getList(): Promise<User[]> {
    try {
      const sql = `SELECT * FROM users`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Unable to get users: ${error}`);
    }
  }

  // update user
  async updateUser(id: string, u: string): Promise<User> {
    try {
      const sql = `UPDATE users SET ${u} WHERE id = '${id}' returning user_name, email, first_name, last_name`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not create product. Error: ${parse(
          error as NodeJS.ErrnoException
        )}`
      );
    }
  }

  // delete user
  async deleteUser(id: string): Promise<User> {
    try {
      const sql = `DELETE FROM users WHERE id = '${id}' returning user_name, email, first_name, last_name`;
      const client: PoolClient = await pool.connect();
      const result: QueryResult = await client.query(sql);
      client.release();
      return result.rows[0];
    } catch (error) {
      throw new Error('unable to create user');
    }
  }

  // auth
  async auth(email: string, password: string): Promise<User | null> {
    try {
      const sql = `SELECT password FROM users WHERE email='${email}'`;
      const client: PoolClient = await pool.connect();
      const result = await client.query(sql);
      if (result.rows.length) {
        const { password: hashed } = result.rows[0];
        if (isValid(hashed, password)) {
          const sql = `SELECT id, email, user_name, first_name, last_name FROM users WHERE email='${email}'`;
          const client = await pool.connect();
          const result = await client.query(sql);
          client.release();
          return result.rows[0];
        }
      }
      client.release();
      return null;
    } catch (error) {
      throw new Error(`unable to login: ${(error as Error).message}`);
    }
  }
}

export default UserModel;
