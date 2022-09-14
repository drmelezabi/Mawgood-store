import { Response, Request, NextFunction } from 'express';
import { ItemInvoice, itemList, Order } from '../../types/order';
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
    const currentOrder: itemList | null = await order.getOrders(userId);
    if (currentOrder != null) {
      return res.json({
        ...currentOrder,
      });
    } else {
      return res.status(404).json({
        message: `No active orders for user number ${userId}`,
      });
    }
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
    const currentOrder = await order.getCurrentOrderByUserId(userId);
    if (currentOrder != null) {
      return res.json(currentOrder);
    } else {
      return res.status(404).json({
        message: `No active orders for user number ${userId}`,
      });
    }
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
    const activeOrder: { order_id: number; items: ItemInvoice[] } | null =
      await order.getOnProgressOrdersByUserId(userId);
    if (activeOrder != null) {
      return res.json({
        ...activeOrder,
      });
    } else {
      return res.status(404).json({
        message: `No active orders for user number ${userId}`,
      });
    }
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
    const currentOrder: { order_id: number; items: ItemInvoice[] }[] | null =
      await order.getDoneOrdersByUserId(userId);
    if (currentOrder != null) {
      return res.json({
        ...currentOrder,
      });
    } else {
      return res.status(404).json({
        message: `No completed orders for user number ${userId}`,
      });
    }
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

    if (['active', 'complete'].includes(status)) {
      const updatedOrder: {
        order_id: number;
        status?: string;
        items: ItemInvoice[];
      } | null = await order.updateOrderStatus(status, orderId);

      if (updatedOrder != null) {
        return res.json({
          message: `order number ${orderId} successfully updated`,
          data: updatedOrder,
        });
      } else {
        return res.status(404).json({
          message: `order number ${orderId} is not exist`,
        });
      }
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
    const deletedOrder: {
      order_id: number;
      status: string;
      items: ItemInvoice[];
    } | null = await order.deleteOrder(orderId);
    if (deletedOrder != null) {
      return res.json({
        message: `order number ${orderId} successfully deleted`,
        data: deletedOrder,
      });
    } else {
      return res.status(404).json({
        message: `order number ${orderId} is not exist`,
      });
    }
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
      const newOrder: { order_id: number; items: ItemInvoice[] } =
        await order.createOrder(req.body as Order);
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
