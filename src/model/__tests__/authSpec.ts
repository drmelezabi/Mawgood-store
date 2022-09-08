import UserModel from '../users';
import pool from '../../database';
import User from '../../types/users';
import supertest from 'supertest';

const user = new UserModel();

describe('Authorization model', () => {
  describe('method exist', () => {
    it('auth is exist', () => {
      expect(user.auth).toBeDefined();
    });
  });
});

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
    expect(authUsers?.email).toBe(newUser.email);
    expect(authUsers?.user_name).toBe(newUser.user_name);
    expect(authUsers?.first_name).toBe(newUser.first_name);
    expect(authUsers?.last_name).toBe(newUser.last_name);
  });

  it('authenticate method should return null for wrong credentials', async () => {
    const authUsers = await user.auth('egy.pianit@gmail.com', 'wrong_Password');
    expect(authUsers).toBe(null);
    const auth_Users = await user.auth('wrong.mail@gmail.com', 'm123');
    expect(auth_Users).toBe(null);
  });
});
