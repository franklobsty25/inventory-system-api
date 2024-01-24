import { Router } from 'express';
import bodyParser from 'body-parser';
import { authenticate } from '../utils/auth';
import {
  createOrderDetail,
  deleteOrderDetail,
  editOrderDetail,
  getOrderDetail,
  getOrderDetails,
} from '../controllers/order-detail.controller';

const router = Router();
router.use(bodyParser.json());

router.get('/list', authenticate, getOrderDetails);

router.get('/:detail', authenticate, getOrderDetail);

router.post('/:order/create/:product', authenticate, createOrderDetail);

router.put('/:detail/edit', authenticate, editOrderDetail);

router.delete('/:detail/delete', authenticate, deleteOrderDetail);

export default router;
