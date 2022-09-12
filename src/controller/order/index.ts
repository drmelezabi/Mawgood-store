import { Response, Request, NextFunction } from 'express';
import { Order, OrderInvoice } from '../../types/order';
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
    const userId: number = parseInt(req.params.user_id);
    const currentOrder: OrderInvoice[] = await order.getOrders(userId);
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
    const userId: number = parseInt(req.params.user_id);
    const currentOrder: OrderInvoice = await order.getCurrentOrderByUserId(
      userId
    );
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
    const userId: number = parseInt(req.params.user_id);
    const activeOrder: OrderInvoice[] = await order.getOnProgressOrdersByUserId(
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
    const userId: number = parseInt(req.params.user_id);
    const currentOrder: OrderInvoice[] = await order.getDoneOrdersByUserId(
      userId
    );
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
    const status = req.body.status as string;
    const orderId: number = parseInt(req.params.order_id);

    if (['on progress', 'done'].includes(status)) {
      const updatedOrder: OrderInvoice = await order.updateOrderStatus(
        status,
        orderId
      );
      return res.json({
        message: `order number ${orderId} successfully updated`,
        data: updatedOrder,
      });
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
    const orderId: number = parseInt(req.params.order_id);
    const deletedOrder: Order | OrderInvoice = await order.deleteOrder(orderId);
    return res.json({
      message: `order number ${orderId} successfully deleted`,
      data: deletedOrder,
    });
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
    if (
      'product_id' in req.body &&
      'quantity' in req.body &&
      'user_id' in req.body
    ) {
      const newOrder: OrderInvoice = await order.createOrder(req.body as Order);
      return res.json(newOrder);
    } else {
      res.status(400).json({
        status: 'error',
        message: 'some needed data is missed',
      });
    }
  } catch (error) {
    next(error);
  }
};
