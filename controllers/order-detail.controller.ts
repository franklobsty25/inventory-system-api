import { Request, Response } from 'express';
import {
  OrderDetailDocument,
  PaginateOrderDetailModel,
} from '../models/order-detail.model';
import { ResponseService } from '../utils/response.service';
import { FilterQuery } from 'mongoose';
import {
  createOrderDetailSchema,
  editOrderDetailSchema,
} from '../schemas/order-detail.schema';

const getOrderDetail = async (req: Request, res: Response) => {
  try {
    const detailId = req.params.detail;

    const orderDetail: OrderDetailDocument =
      (await PaginateOrderDetailModel.findOne({
        _id: detailId,
        isDeleted: { $ne: true },
      })) as OrderDetailDocument;

    if (!orderDetail)
      return ResponseService.json(res, 400, 'Order detail not found.');

    ResponseService.json(
      res,
      200,
      'Order detail retrieved successfully.',
      orderDetail
    );
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const getOrderDetails = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, all, search } = req.query;

    const query: FilterQuery<OrderDetailDocument> = {
      isDeleted: { $ne: true },
    };

    if (search)
      query.$or = [{ description: { $regex: search, $options: 'i' } }];

    if (Number(search) >= 0)
      query.$or = [{ quantity: Number(search) }, { unitPrice: Number(search) }];

    const orderDetails = await PaginateOrderDetailModel.paginate(query, {
      sort: '-1',
      page: Number(page),
      limit: Number(limit),
      pagaination: all === 'false' ? true : false,
    });

    ResponseService.json(
      res,
      200,
      'Order details retrieved successfully.',
      orderDetails
    );
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const createOrderDetail = async (req: Request, res: Response) => {
  try {
    const { order, product } = req.params;

    const { error, value } = createOrderDetailSchema.validate(req.body);

    if (error) return ResponseService.json(res, error);

    value.order = order;
    value.product = product;

    const orderDetail: OrderDetailDocument =
      await PaginateOrderDetailModel.create(value);

    ResponseService.json(
      res,
      201,
      'Order detail created successfully.',
      orderDetail
    );
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const editOrderDetail = async (req: Request, res: Response) => {
  try {
    const detailId = req.params.detail;

    const { error, value } = editOrderDetailSchema.validate(req.body);

    if (error) return ResponseService.json(res, error);

    const updatedOrderDetail: OrderDetailDocument =
      (await PaginateOrderDetailModel.findOneAndUpdate(
        { _id: detailId, isDeleted: { $ne: true } },
        value,
        { new: true }
      )) as OrderDetailDocument;

    if (!updatedOrderDetail)
      return ResponseService.json(
        res,
        400,
        'Order detail not found to be updated.'
      );

    ResponseService.json(
      res,
      200,
      'Order detail updated successfully.',
      updatedOrderDetail
    );
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const deleteOrderDetail = async (req: Request, res: Response) => {
  const detailId = req.params.detail;

  const deletedOrderDetail: OrderDetailDocument =
    (await PaginateOrderDetailModel.findOneAndUpdate(
      { _id: detailId, isDeleted: { $ne: true } },
      { $set: { isDeleted: true } },
      { new: true }
    )) as OrderDetailDocument;

  if (!deletedOrderDetail)
    return ResponseService.json(
      res,
      400,
      'Order detail not found to be deleted.'
    );

  ResponseService.json(res, 200, 'Order detail deleted successfully.');
};

export {
  getOrderDetail,
  getOrderDetails,
  createOrderDetail,
  editOrderDetail,
  deleteOrderDetail,
};
