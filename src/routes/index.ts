import { Router } from 'express';
import OrdersRoutes from './order';
import ProductRoutes from './product';
import userRoutes from './users';

const user = Router();

user.use('/users', userRoutes);
user.use('/products', ProductRoutes);
user.use('/orders', OrdersRoutes);

export default user;
