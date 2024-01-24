import { type Request, type Response } from 'express';
import { ResponseService } from '../utils/response.service';
import {
  createProductSchema,
  editProductSchema,
} from '../schemas/product.schema';
import {
  PaginateProductModel,
  type ProductDocument,
} from '../models/product.model';
import { type FilterQuery } from 'mongoose';

const getProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.product;

    const product: ProductDocument = (await PaginateProductModel.findOne({
      _id: productId,
      isDeleted: { $ne: true },
    }))!;

    if (!product) {
      return ResponseService.json(res, 400, 'Product not found');
    }

    ResponseService.json(res, 200, 'Product retrieved successfully', product);
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, all, search } = req.query;

    const query: FilterQuery<ProductDocument> = {
      isDeleted: { $ne: true },
    };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    if (Number(search) >= 0) {
      query.$or = [{ unitPrice: Number(search) }, { quantity: Number(search) }];
    }

    const products = await PaginateProductModel.paginate(query, {
      sort: '-1',
      page: Number(page),
      limit: Number(limit),
      pagination: all === 'false',
    });

    ResponseService.json(res, 200, 'Products retrieved successfully', products);
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const supplier = req.params.supplier;
    const { error, value } = createProductSchema.validate(req.body);

    if (error) {
      return ResponseService.json(res, error);
    }

    value.supplier = supplier;

    const product = await PaginateProductModel.create(value);

    ResponseService.json(res, 201, 'Product created successfully', product);
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const editProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.product;

    const { error, value } = editProductSchema.validate(req.body);

    if (error) {
      return ResponseService.json(res, error);
    }

    const updatedProduct = await PaginateProductModel.findOneAndUpdate(
      { _id: productId, isDeleted: { $ne: true } },
      value,
      { new: true }
    );

    if (!updatedProduct) {
      return ResponseService.json(res, 400, 'Product not found to be updated.');
    }

    ResponseService.json(
      res,
      200,
      'Product updated successfully',
      updatedProduct
    );
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.product;

  const deletedProduct = await PaginateProductModel.findOneAndUpdate(
    { _id: productId, isDeleted: { $ne: true } },
    { $set: { isDeleted: true } },
    { new: true }
  );

  if (!deletedProduct) {
    return ResponseService.json(res, 400, 'Product not found to be deleted.');
  }

  ResponseService.json(res, 200, 'Product deleted successfully');
};

export { getProduct, getProducts, createProduct, editProduct, deleteProduct };
