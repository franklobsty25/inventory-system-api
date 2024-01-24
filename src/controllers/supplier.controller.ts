import { type Request, type Response } from 'express';
import {
  PaginateSupplierModel,
  type SupplierDocument,
} from '../models/supplier.model';
import { ResponseService } from '../utils/response.service';
import { type FilterQuery } from 'mongoose';
import {
  createSupplierSchema,
  editSupplierSchema,
} from '../schemas/supplier.schema';

const getSupplier = async (req: Request, res: Response) => {
  try {
    const supplierId = req.params.supplier;

    const supplier: SupplierDocument = (await PaginateSupplierModel.findOne({
      _id: supplierId,
      isDeleted: { $ne: true },
    }))!;

    if (!supplier) {
      return ResponseService.json(res, 400, 'Supplier not found.');
    }

    ResponseService.json(
      res,
      200,
      'Supplier retrieved successfully.',
      supplier
    );
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const getSuppliers = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, all, search } = req.query;

    const query: FilterQuery<SupplierDocument> = {
      isDeleted: { $ne: true },
    };

    if (search) {
      query.$or = [
        { firstname: { $regex: search, $options: 'i' } },
        { lastname: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const suppliers = await PaginateSupplierModel.paginate(query, {
      sort: '-1',
      page: Number(page),
      limit: Number(limit),
      pagination: all === 'false',
    });

    ResponseService.json(
      res,
      200,
      'Suppliers retrieved successfully.',
      suppliers
    );
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const createSupplier = async (req: Request, res: Response) => {
  try {
    const { error, value } = createSupplierSchema.validate(req.body);

    if (error) {
      return ResponseService.json(res, error);
    }

    const supplier = await PaginateSupplierModel.create(value);

    ResponseService.json(res, 201, 'Supplier created successfully.', supplier);
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const editSupplier = async (req: Request, res: Response) => {
  try {
    const supplierId = req.params.supplier;
    const { error, value } = editSupplierSchema.validate(req.body);

    if (error) {
      return ResponseService.json(res, error);
    }

    const updateSupplier = await PaginateSupplierModel.findOneAndUpdate(
      { _id: supplierId, isDeleted: { $ne: true } },
      value,
      { new: true }
    );

    if (!updateSupplier) {
      return ResponseService.json(
        res,
        400,
        'Supplier not found to be updated.'
      );
    }

    ResponseService.json(
      res,
      200,
      'Supplier updated successfully.',
      updateSupplier
    );
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const deleteSupplier = async (req: Request, res: Response) => {
  const supplierId = req.params.supplier;

  const deletedSupplier = await PaginateSupplierModel.findOneAndUpdate(
    { _id: supplierId, isDeleted: { $ne: true } },
    { $set: { isDeleted: true } },
    { new: true }
  );

  if (!deletedSupplier) {
    return ResponseService.json(res, 400, 'Supplier not found to be deleted.');
  }

  ResponseService.json(res, 200, 'Supplier deleted successfully.');
};

export {
  getSupplier,
  getSuppliers,
  createSupplier,
  editSupplier,
  deleteSupplier,
};
