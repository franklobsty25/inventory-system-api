import { type Request, type Response } from 'express';
import { type OrderDocument, PaginateOrderModel } from '../models/order.model';
import { ResponseService } from '../utils/response.service';
import { type FilterQuery } from 'mongoose';
import { createOrderSchema, editOrderSchema } from '../schemas/order.schema';
import day from 'dayjs';
import { OrderStatusEnum } from '../constants/contants';

const getOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.order;

    const order: OrderDocument = (await PaginateOrderModel.findOne({
      _id: orderId,
      isDeleted: { $ne: true },
    }))!;

    if (!order) {
      return ResponseService.json(res, 400, 'Order not found.');
    }

    ResponseService.json(res, 200, 'Order retrieved successfully.', order);
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, all, search, date } = req.query;

    const query: FilterQuery<OrderDocument> = {
      isDeleted: { $ne: true },
    };

    if (search) query.$or = [{ status: { $regex: search, $options: 'i' } }];

    if (Number(search) >= 0) query.$or = [{ amount: Number(search) }];

    if (date) {
      query.$or = [
        { date: { $gte: day(search as string).toDate() } },
        { completedDate: { $gte: day(search as string).toDate() } },
      ];
    }

    const orders = await PaginateOrderModel.paginate(query, {
      sort: '-1',
      page: Number(page),
      limit: Number(limit),
      pagination: all === 'false',
    });

    ResponseService.json(res, 200, 'Orders retrieved successfully', orders);
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const customer = req.params.customer;
    const { error, value } = createOrderSchema.validate(req.body);

    if (error) {
      return ResponseService.json(res, error);
    }

    value.customer = customer;

    const order: OrderDocument = await PaginateOrderModel.create(value);

    ResponseService.json(res, 201, 'Order created successfully', order);
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const editOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.order;
    const { error, value } = editOrderSchema.validate(req.body);

    if (error) {
      return ResponseService.json(res, error);
    }

    if (value.status) {
      const isValid = Object.values(OrderStatusEnum).includes(value.status);

      if (!isValid) {
        return ResponseService.json(res, 400, 'Invalid order status.');
      }
    }

    const updatedOrder: OrderDocument =
      (await PaginateOrderModel.findOneAndUpdate(
        { _id: orderId, isDeleted: { $ne: true } },
        { $set: { ...value, completedDate: new Date() } },
        { new: true }
      ))!;

    if (!updatedOrder) {
      return ResponseService.json(res, 400, 'Order not found to be updated.');
    }

    ResponseService.json(res, 200, 'Order updated successfully.', updatedOrder);
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  const orderId = req.params.order;

  const deletedOrder: OrderDocument =
    (await PaginateOrderModel.findOneAndUpdate(
      { _id: orderId, isDeleted: { $ne: true } },
      { $set: { isDeleted: true } },
      { new: true }
    ))!;

  if (!deletedOrder) {
    return ResponseService.json(res, 400, 'Order not found to be deleted.');
  }

  ResponseService.json(res, 200, 'Order deleted successfully.');
};

export { getOrder, getOrders, createOrder, editOrder, deleteOrder };
