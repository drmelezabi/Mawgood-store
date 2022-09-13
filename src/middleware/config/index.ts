import denv from 'dotenv';

denv.config();

const {
  SERVER_PORT,
  NODE_ENV,
  PG_HOST,
  PG_PORT,
  PG_DB,
  PG_DB_TEST,
  PG_USER,
  PG_PASSWORD,
  BCRYPT_PASSWORD,
  SLART_ROUNDS,
  TOKEN_SECRET,
} = process.env;

export default {
  SERVER_PORT: SERVER_PORT as unknown as number,
  PG_HOST: PG_HOST as string,
  PG_PORT: PG_PORT as unknown as number,
  PG_DATABASE_DEV:
    NODE_ENV === 'dev' ? (PG_DB as string) : (PG_DB_TEST as string),
  PG_USER: PG_USER as string,
  PG_PASSWORD: PG_PASSWORD as string,
  BCRYPT_PASSWORD: BCRYPT_PASSWORD as string,
  SLART_ROUNDS: parseInt(SLART_ROUNDS as string, 10),
  tokenSecret: TOKEN_SECRET,
};
