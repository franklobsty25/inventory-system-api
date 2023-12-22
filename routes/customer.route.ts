import { Router } from 'express'
import bodyParser from 'body-parser'
import { authenticate } from '../utils/auth'
import {
  createCustomer,
  deleteCustomer,
  editCustomer,
  getCustomer,
  getCustomers
} from '../controllers/customer.controller'

const router = Router()
router.use(bodyParser.json())

router.get('/list', authenticate, getCustomers)

router.get('/:customer', authenticate, getCustomer)

router.post('/create', authenticate, createCustomer)

router.put('/:customer/edit', authenticate, editCustomer)

router.delete('/:customer/delete', authenticate, deleteCustomer)

export default router
