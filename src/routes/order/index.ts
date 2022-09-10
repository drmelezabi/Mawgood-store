import { Router } from 'express';
import * as controller from '../../controller/order';
import validateToken from '../../middleware/auth';

const OrdersRoutes = Router();

OrdersRoutes.route('/').post(validateToken, controller.createOrder);

OrdersRoutes.route('/:order_id')
  .delete(validateToken, controller.deleteOrder)
  .patch(validateToken, controller.updateOrderStatus);

OrdersRoutes.route('/done/:user_id').get(controller.getDoneOrdersByUserId);

OrdersRoutes.route('/onprogress/:user_id').get(
  controller.getOnProgressOrdersByUserId
);

OrdersRoutes.route('/current/:user_id').get(controller.getCurrentOrderByUserId);

OrdersRoutes.route('/:user_id').get(controller.getOrders);

export default OrdersRoutes;
