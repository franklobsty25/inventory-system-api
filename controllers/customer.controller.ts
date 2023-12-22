import { Request, Response } from 'express';
import { ResponseService } from '../utils/response.service';
import {
  createCustomerSchema,
  editCustomerSchema,
} from '../schemas/customer.schema';
import {
  CustomerDocument,
  PaginateCustomerModel,
} from '../models/customer.model';
import CustomRequest from '../utils/custom.request';
import { FilterQuery } from 'mongoose';

const getCustomer = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.customer;

    const customer = await PaginateCustomerModel.findOne({
      _id: customerId,
      isDeleted: { $ne: true },
    });

    if (!customer) return ResponseService.json(res, 400, 'Customer not found.');

    ResponseService.json(res, 200, 'Customer retrieved successfully', customer);
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const getCustomers = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, all, search } = req.query;

    const query: FilterQuery<CustomerDocument> = {
      isDeleted: { $ne: true },
    };
    
    if (search)
      query.$or = [
        { firstname: { $regex: search, $options: 'i' } },
        { lastname: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];

    const customers = await PaginateCustomerModel.paginate(query, {
      sort: '-1',
      page: Number(page),
      limit: Number(limit),
      pagination: all === 'false' ? true : false,
    });

    ResponseService.json(
      res,
      200,
      'Customers retrieved successfully.',
      customers
    );
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const createCustomer = async (req: CustomRequest, res: Response) => {
  try {
    const { error, value } = createCustomerSchema.validate(req.body);

    if (error) return ResponseService.json(res, error);

    const customer = await PaginateCustomerModel.create(value);

    ResponseService.json(res, 201, 'Customer created successfully.', customer);
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const editCustomer = async (req: Request, res: Response) => {
  try {
    const { error, value } = editCustomerSchema.validate(req.body);

    if (error) return ResponseService.json(res, error);

    const customer = req.params.customer;

    const updatedcustomer = await PaginateCustomerModel.findOneAndUpdate(
      { _id: customer, isDeleted: { $ne: true } },
      value,
      { new: true }
    );

    if (!updatedcustomer)
      return ResponseService.json(
        res,
        400,
        'Customer not found to be updated.'
      );

    ResponseService.json(
      res,
      200,
      'Customer updated successfully.',
      updatedcustomer
    );
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const customer = req.params.customer;

    const deletedCustomer = await PaginateCustomerModel.findOneAndUpdate(
      { _id: customer, isDeleted: { $ne: true } },
      { $set: { isDeleted: true } },
      { new: true }
    );

    if (!deletedCustomer)
      return ResponseService.json(
        res,
        400,
        'Customer not found to be deleted.'
      );

    ResponseService.json(res, 200, 'Customer deleted successfully.');
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

export {
  getCustomer,
  getCustomers,
  createCustomer,
  editCustomer,
  deleteCustomer,
};
