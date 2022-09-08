import { Router } from 'express';
import userRoutes from './users';

const user = Router();

user.use('/users', userRoutes);

export default user;
