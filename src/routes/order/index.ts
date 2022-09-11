import { Router } from 'express';
import * as controller from '../../controller/order';
import validateToken from '../../middleware/auth';

const OrdersRoutes = Router();

OrdersRoutes.route('/:order_id')
  .delete(validateToken, controller.deleteOrder)
  .patch(validateToken, controller.updateOrderStatus);

OrdersRoutes.route('/done/:user_id').get(
  validateToken,
  controller.getDoneOrdersByUserId
);

OrdersRoutes.route('/onprogress/:user_id').get(
  validateToken,
  controller.getOnProgressOrdersByUserId
);

OrdersRoutes.route('/current/:user_id').get(
  validateToken,
  controller.getCurrentOrderByUserId
);

OrdersRoutes.route('/users/:user_id').get(validateToken, controller.getOrders);

OrdersRoutes.route('/').post(validateToken, controller.createOrder);

export default OrdersRoutes;
