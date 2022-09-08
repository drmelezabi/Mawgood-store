import config from '../config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Auth from '../../types/auth';

export const hash = (password: string) =>
  bcrypt.hashSync(`${password}${config.BCRYPT_PASSWORD}`, config.SLART_ROUNDS);

export const isValid = (hashed: string, password: string) =>
  bcrypt.compareSync(`${password}${config.BCRYPT_PASSWORD}`, hashed);

export const token = (user: Auth) =>
  jwt.sign({ user }, config.tokenSecret as unknown as string);

export const decode = (sToken: string) =>
  jwt.verify(sToken, config.tokenSecret as unknown as string);
