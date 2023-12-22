import { Router } from 'express';
import bodyParser from 'body-parser';
import {
  changePassword,
  currentUser,
  deleteUser,
  editUser,
  forgot,
  getUsers,
  login,
  reset,
  setOrChangeRole,
  signup,
} from '../controllers/user.controller';
import { authenticate } from '../utils/auth';

const router = Router();
router.use(bodyParser.json());

router.get('/', authenticate, currentUser);

router.get('/list', authenticate, getUsers);

router.post('/sign-up', signup);

router.post('/login', login);

router.put('/change-password', authenticate, changePassword);

router.post('/forgot', forgot);

router.put('/reset', reset);

router.put('/edit', authenticate, editUser);

router.put('/:user/change-role', authenticate, setOrChangeRole);

router.delete('/delete', authenticate, deleteUser);

export default router;
