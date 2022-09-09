import { Router } from 'express';
import ProductRoutes from './product';
import userRoutes from './users';

const user = Router();

user.use('/users', userRoutes);
user.use('/products', ProductRoutes);

export default user;
