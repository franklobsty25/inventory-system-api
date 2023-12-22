import { Router } from 'express'
import bodyParser from 'body-parser'
import { authenticate } from '../utils/auth'
import {
  createTransaction,
  deleteTransaction,
  editTransaction,
  getTransaction,
  getTransactions
} from '../controllers/transaction.controller'

const router = Router()
router.use(bodyParser.json())

router.get('/list', authenticate, getTransactions)

router.get('/:transaction', authenticate, getTransaction)

router.post('/:product/create', authenticate, createTransaction)

router.put('/:transaction/edit', authenticate, editTransaction)

router.delete('/:transaction/delete', authenticate, deleteTransaction)

export default router
