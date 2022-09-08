import UserModel from '../users';
import pool from '../../database';
import User from '../../types/users';
import supertest from 'supertest';

const user = new UserModel();

describe('Authorization model', () => {
  const newUser = {
    email: 'egy.pianit@gmail.com',
    user_name: 'Dr.mez',
    first_name: 'mohamed',
    last_name: 'El_Ezabi',
    password: 'm123',
  } as User;

  beforeAll(async () => {
    const createuser = await user.create(newUser);
    newUser.id = createuser.id;
  });

  afterAll(async () => {
    const sql = 'DELETE FROM users';
    const client = await pool.connect();
    await client.query(sql);
    client.release();
  });

  it('authenticate method should return authenticated user', async () => {
    const authUsers = await user.auth(
      newUser.email,
      newUser.password as string
    );
  });
});
