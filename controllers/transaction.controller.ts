import { type Request, type Response } from 'express'
import {
  PaginateTransactionModel,
  type TransactionDocument
} from '../models/transaction.model'
import { ResponseService } from '../utils/response.service'
import { type FilterQuery } from 'mongoose'
import day from 'dayjs'
import {
  createTransactionSchema,
  editTransactionSchema
} from '../schemas/transaction.schema'
import { TransactionTypeEnum } from '../constants/contants'

const getTransaction = async (req: Request, res: Response) => {
  try {
    const transactionId = req.params.transaction

    const transaction: TransactionDocument =
      (await PaginateTransactionModel.findOne({
        _id: transactionId,
        isDeleted: { $ne: true }
      }))!

    if (!transaction) {
      ResponseService.json(
        res,
        400,
        'Transaction information not found.'
      ); return
    }

    ResponseService.json(
      res,
      200,
      'Transaction information retrieved successfully.',
      transaction
    )
  } catch (error) {
    ResponseService.json(res, error as Error)
  }
}

const getTransactions = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, all, search, date } = req.query

    const query: FilterQuery<TransactionDocument> = {
      isDeleted: { $ne: true }
    }

    if (search) query.$or = [{ type: { $regex: search, $options: 'i' } }]

    if (Number(search) >= 0) query.$or = [{ quantity: Number(search) }]

    if (date) {
      query.$or = [
        { date: { $gte: day(search as string).toDate() } },
        { createdAt: { $gte: day(search as string).toDate() } }
      ]
    }

    const transactions = await PaginateTransactionModel.paginate(query, {
      sort: '-1',
      page: Number(page),
      limit: Number(limit),
      pagination: all === 'false'
    })

    ResponseService.json(
      res,
      200,
      'Transactions retrieved successfully.',
      transactions
    )
  } catch (error) {
    ResponseService.json(res, error as Error)
  }
}

const createTransaction = async (req: Request, res: Response) => {
  try {
    const product = req.params.product

    const { error, value } = createTransactionSchema.validate(req.body)

    if (error) { ResponseService.json(res, error); return }

    if (value.type) {
      const isValid = Object.values(TransactionTypeEnum).includes(value.type)
      if (!isValid) { ResponseService.json(res, 400, 'Invalid transaction type.'); return }
    }

    value.product = product

    const transaction: TransactionDocument =
      await PaginateTransactionModel.create(value)

    ResponseService.json(
      res,
      201,
      'Transaction created successfully.',
      transaction
    )
  } catch (error) {
    ResponseService.json(res, error as Error)
  }
}

const editTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = req.params.transaction

    const { error, value } = editTransactionSchema.validate(req.body)

    if (error) { ResponseService.json(res, error); return }

    if (value.type) {
      const isValid = Object.values(TransactionTypeEnum).includes(value.type)
      if (!isValid) { ResponseService.json(res, 400, 'Invalid transaction type.'); return }
    }

    const updatedTransaction: TransactionDocument =
      (await PaginateTransactionModel.findOneAndUpdate(
        { _id: transaction, isDeleted: { $ne: true } },
        value,
        { new: true }
      ))!

    if (!updatedTransaction) {
      ResponseService.json(
        res,
        400,
        'Transaction information not found.'
      ); return
    }

    ResponseService.json(
      res,
      200,
      'Transaction updated successfully.',
      updatedTransaction
    )
  } catch (error) {
    ResponseService.json(res, error as Error)
  }
}

const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = req.params.transaction

    const deletedTransaction: TransactionDocument =
      (await PaginateTransactionModel.findOneAndUpdate(
        { _id: transaction, isDeleted: { $ne: true } },
        { $set: { isDeleted: true } },
        { new: true }
      ))!

    if (!deletedTransaction) {
      ResponseService.json(
        res,
        400,
        'Transaction to be deleted not found.'
      ); return
    }

    ResponseService.json(res, 200, 'Transaction deleted successfully.')
  } catch (error) {
    ResponseService.json(res, error as Error)
  }
}

export {
  getTransaction,
  getTransactions,
  createTransaction,
  editTransaction,
  deleteTransaction
}
