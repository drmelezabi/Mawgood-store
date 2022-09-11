import UserModel from '../users';
import pool from '../../database';
import User from '../../types/users';
import { sql } from './sqlData';
// import supertest from 'supertest';

const user = new UserModel();

describe('----------------------------- User Model ---------------------------', () => {
  describe('Authorization Function', () => {
    const newUser = {
      email: 'egy.pianit@gmail.com',
      user_name: 'dr.mez',
      first_name: 'mohamed',
      last_name: 'El_Ezabi',
      password: 'm123',
    } as User;

    beforeAll(async () => {
      const createUser = await user.create(newUser);
      newUser.id = createUser.id;
    });

    it('Login auth function works successfully when Email & password are correct', async () => {
      const result = await user.auth(newUser.email, newUser.password as string);
      expect(result).not.toBe(null);
    });

    it('Authenticate method should return authenticated user', async () => {
      const authUsers = await user.auth(
        newUser.email,
        newUser.password as string
      );
      expect(authUsers?.email).toBe(newUser.email);
      expect(authUsers?.user_name).toBe(newUser.user_name);
      expect(authUsers?.first_name).toBe(newUser.first_name);
      expect(authUsers?.last_name).toBe(newUser.last_name);
    });

    it('Login auth function return null if password is wrong', async () => {
      const result = await user.auth(newUser.email, 'wrong password');
      expect(result).toBe(null);
    });

    it('Login auth function return null if Email is wrong', async () => {
      const result = await user.auth(newUser.email, 'wrong password');
      expect(result).toBe(null);
    });

    it('Reset Password return data when Email & old password are correct', async () => {
      const result = await user.resPassword(
        newUser.email,
        newUser.password,
        'newPass'
      );
      expect(result?.email).toBe('egy.pianit@gmail.com');
    });

    afterAll(async () => {
      const sql = 'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART;';
      const client = await pool.connect();
      await client.query(sql);
      client.release();
    });
  });

  describe('Users Basic CRUD', () => {
    const newUser = {
      email: 'egy.pianit@gmail.com',
      user_name: 'Dr.mez',
      first_name: 'mohamed',
      last_name: 'El_Ezabi',
      password: 'm123',
    } as User;

    beforeAll(async () => {
      const createUser = await user.create(newUser);
      newUser.id = createUser.id;
    });

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

    it('Update user by ID return user object if user id in exist', async () => {
      const result = await user.updateUser(1, `first_name = 'Ali'`);
      expect(result.first_name).toEqual('Ali');
    });

    it('Delete user by ID return deleted user object if user id in exist', async () => {
      const result = await user.updateUser(1, `first_name = 'Ali'`);
      expect(result.first_name).toEqual('Ali');
    });

    afterAll(async () => {
      const sql = 'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART;';
      const client = await pool.connect();
      await client.query(sql);
      client.release();
    });
  });

  describe('Best Users', () => {
    beforeAll(async () => {
      const client = await pool.connect();
      await client.query(sql);
      client.release();
    });

    it('Get Best 5 clients who had made a lot of purchase', async () => {
      const result = await user.bestUsers();
      expect(result.length).toEqual(5);
    });

    afterAll(async () => {
      const sql = 'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART;';
      const client = await pool.connect();
      await client.query(sql);
      client.release();
    });
  });
});
