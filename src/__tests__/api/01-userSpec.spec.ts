import UserModel from '../../model/users';
import pool from '../../database';
import User from '../../types/users';
import * as externalSQL from './sqlData';
import { PoolClient, QueryResult } from 'pg';
import { hash } from '../../middleware/security';

const user = new UserModel();
const newUser = {
  email: 'egy.pianit@gmail.com',
  user_name: 'dr.mez',
  first_name: 'mohamed',
  last_name: 'El_Ezabi',
  password: 'm123',
} as User;

describe('------------------------------------ User Model ------------------------------------', () => {
  describe('Create User, Authorization Login & Reset Password', () => {
    it('create new users account', async () => {
      const createUserResult = await user.create(newUser);
      expect(createUserResult?.email).toEqual(newUser.email);
      expect(createUserResult?.user_name).toEqual(newUser.user_name);
      expect(createUserResult?.first_name).toEqual(newUser.first_name);
      expect(createUserResult?.last_name).toEqual(newUser.last_name);
      newUser.id = createUserResult.id;
    });
    it('Auth function -> PASS correct Email address & password -> RETURN {Email,Username,first_name,last_name}', async () => {
      const loginResult = await user.auth(
        newUser.email as string,
        newUser.password as string
      );
      expect(loginResult?.email).toEqual(newUser.email);
      expect(loginResult?.user_name).toEqual(newUser.user_name);
      expect(loginResult?.first_name).toEqual(newUser.first_name);
      expect(loginResult?.last_name).toEqual(newUser.last_name);
    });
    it('Auth function -> PASS correct Email address & wrong password -> RETURN null', async () => {
      const loginResult = await user.auth(
        newUser.email as string,
        'wrong password'
      );
      expect(loginResult).toEqual(null);
    });
    it('Login auth function with wrong Email address & wrong password -> RETURN null', async () => {
      const result = await user.auth('wrong Email', newUser.password as string);
      expect(result).toBe(null);
    });
    it('resPassword function -> PASS correct {Email address, old Password, New Password} -> RETURN {Email,Username}', async () => {
      const resetPasswordResult = await user.resPassword(
        newUser.email,
        newUser.password,
        'newPass'
      );
      expect(resetPasswordResult?.email).toEqual(newUser.email);
      expect(resetPasswordResult?.user_name).toEqual(newUser.user_name);
    });
    it('resPassword function -> PASS correct {Email address, New Password) but with wrong password ->', async () => {
      const resetPasswordResult = await user.resPassword(
        newUser.email,
        'wrong password',
        'newPass'
      );
      expect(resetPasswordResult).toBe(null);
    });
  });
  describe('GET Users', () => {
    it('Get list of user accounts', async () => {
      const result = await user.getList();
      expect(result.length).toEqual(1);
    });

    it('Get user by ID return user object if user id in exist', async () => {
      const result = await user.getUser(1);
      expect(result.email).toEqual('egy.pianit@gmail.com');
    });

    it('Get user by ID retune undefined when user id is not exist', async () => {
      const result = await user.getUser(15);
      expect(result as User | undefined).toBe(undefined);
    });
  });

  describe('Update Users', () => {
    it('Update user by ID return user object if user id in exist', async () => {
      const result = await user.updateUser(1, `first_name = 'Ali'`);
      expect(result.first_name).toEqual('Ali');
    });

    it('Update user by ID retune undefined when user id is not exist', async () => {
      const result = await user.updateUser(15, `first_name = 'Ali'`);
      expect(result as User | undefined).toBe(undefined);
    });
  });

  describe('Delete Users', () => {
    it('Delete user by ID return deleted user object if user id in exist', async () => {
      const result = await user.deleteUser(1);
      expect(result.first_name).toEqual('Ali');
    });

    it('Delete user by ID retune undefined when user id is not exist', async () => {
      const result = await user.deleteUser(15);
      expect(result as User | undefined).toBe(undefined);
    });

    afterAll(async () => {
      const sql = 'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART;';
      const client = await pool.connect();
      await client.query(sql);
      client.release();
    });
  });

  describe('Get Best Users', () => {
    beforeAll(async () => {
      const client = await pool.connect();
      await client.query(externalSQL.sql);
      client.release();
    });

    it('Get Best 5 clients who had made a lot of purchase', async () => {
      const result = await user.bestUsers();
      expect(result.length).toEqual(5);
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
