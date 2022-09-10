import { Response, Request, NextFunction } from 'express';
import { Order } from '../../types/order';
// import { parse } from '../../middleware/parsing';
import { Orders } from '../../model/order';

const order: Orders = new Orders();

// Get all orders by user id '/:user_id'
export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.user_id;
    const currentOrder: Order[] = await order.getOrders(userId);
    return res.json(currentOrder);
  } catch (error) {
    next(error);
  }
};

// Get current order by user id '/current/:user_id'
export const getCurrentOrderByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.user_id;
    const currentOrder: Order = await order.getCurrentOrderByUserId(userId);
    return res.json(currentOrder);
  } catch (error) {
    next(error);
  }
};

// Get active order by user id '/onprogress/:user_id'
export const getOnProgressOrdersByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.user_id;
    const activeOrder: Order[] = await order.getOnProgressOrdersByUserId(
      userId
    );
    return res.json(activeOrder);
  } catch (error) {
    next(error);
  }
};

// Get all completed orders by user id '/done/:user_id'
export const getDoneOrdersByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.user_id;
    const currentOrder: Order[] = await order.getDoneOrdersByUserId(userId);
    return res.json(currentOrder);
  } catch (error) {
    next(error);
  }
};

// Update order's status. '/:order_id'
export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status = req.query.status as string;
    const orderId = req.params.order_id as string;

    if (orderId && ['On Progress', 'Done'].includes(status)) {
      const updatedOrder: Order = await order.updateOrderStatus(
        status,
        orderId
      );
      return res.json(updatedOrder);
    } else {
      return res.status(400).json({ Error: 'Bad parameters' });
    }
  } catch (error) {
    next(error);
  }
};

// delete order by order id '/:order_id'
export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId: string = req.params.id;
    const deletedOrder: Order = await order.deleteOrder(orderId);
    return res.json(deletedOrder);
  } catch (error) {
    next(error);
  }
};

// create order '/'
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newOrder: Order = await order.createOrder(req.body);
    return res.json(newOrder);
  } catch (error) {
    next(error);
  }
};
