import { type Request, type Response } from 'express';
import * as argon2 from 'argon2';
import { PaginateUserModel, type UserDocument } from '../models/user.model';
import {
  changePasswordSchema,
  editSchema,
  loginSchema,
  resetSchema,
  setRoleSchema,
  signupSchema,
} from '../schemas/user.schemas';
import { ResponseService } from '../utils/response.service';
import { getToken } from '../utils/auth';
import { type FilterQuery } from 'mongoose';
import type CustomRequest from '../utils/custom.request';

const currentUser = async (req: CustomRequest, res: Response) => {
  const { user } = req;
  const u: UserDocument = (await PaginateUserModel.findOne({
    _id: user!.id,
    isDeleted: { $ne: true },
  }).select('firstname lastname middlename email role')) as UserDocument;

  ResponseService.json(res, 200, 'User retrieved successfully.', u);
};

const getUsers = async (req: Request, res: Response) => {
  const { page = 1, limit = 20, search, all } = req.query;

  const query: FilterQuery<UserDocument> = {
    isDeleted: { $ne: true },
  };

  if (search) {
    query.$or = [
      { firstname: { $regex: search, $options: 'i' } },
      { lastname: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phoneNumber: { $regex: search, $options: 'i' } },
    ];
  }

  const users = await PaginateUserModel.paginate(query, {
    sort: '-1',
    page: Number(page),
    limit: Number(limit),
    pagination: all === 'false',
    select: '-password',
  });
  ResponseService.json(res, 200, 'Users retrieved successfully.', users);
};

const signup = async (req: Request, res: Response) => {
  try {
    const { error, value } = signupSchema.validate(req.body);

    if (error) {
      return ResponseService.json(res, error);
    }

    if (value) {
      const { password, repeatPassword } = value;

      if (password !== repeatPassword) {
        return ResponseService.json(res, 400, 'Password mismatch.');
      }

      value.password = await argon2.hash(value.password);
      const user: UserDocument = new PaginateUserModel(value);
      const token = getToken({ id: user.id, email: user.email });

      await user.save();

      ResponseService.json(res, 201, 'User created successfully.', { token });
    }
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return ResponseService.json(res, error);
    }

    const { email, password } = value;
    const user: UserDocument = (await PaginateUserModel.findOne({
      email,
      isDeleted: { $ne: true },
    }))!;

    if (!user) {
      return ResponseService.json(res, 400, `User with ${email} not found.`);
    }

    const isValid: boolean = await argon2.verify(user.password, password);

    if (!isValid) {
      return ResponseService.json(res, 401, 'Password invalid.');
    }

    const token = getToken({ id: user.id, email: user.email });

    ResponseService.json(res, 200, 'User logged in successfully.', { token });
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const changePassword = async (req: CustomRequest, res: Response) => {
  try {
    const { error, value } = changePasswordSchema.validate(req.body);
    const { user } = req;

    if (error) return ResponseService.json(res, error);

    const { oldPassword, newPassword, repeatPassword } = value;

    if (newPassword !== repeatPassword) {
      return ResponseService.json(res, 400, 'Password mismatch.');
    }

    const userDoc: UserDocument = (await PaginateUserModel.findOne({
      _id: user!.id,
      isDeleted: { $ne: true },
    }))!;

    if (!user) {
      return ResponseService.json(
        res,
        400,
        'User not found for password changes.'
      );
    }

    const isValid = await argon2.verify(userDoc.password, oldPassword);

    if (!isValid) {
      return ResponseService.json(res, 403, 'Old password mismatch');
    }

    userDoc.password = await argon2.hash(newPassword);

    await userDoc.save();

    ResponseService.json(res, 200, 'User password changed successfully.');
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

/**
 * @TODO: forget implementation
 */
// const forget = (req: Request, res: Response) => {}

const reset = async (req: Request, res: Response) => {
  try {
    const { error, value } = resetSchema.validate(req.body);

    if (error) {
      return ResponseService.json(res, error);
    }

    const { email, password, repeatPassword } = value;
    const user: UserDocument = (await PaginateUserModel.findOne({
      email,
      isDeleted: { $ne: true },
    }))!;

    if (!user) {
      return ResponseService.json(
        res,
        400,
        'User not found for password reset.'
      );
    }

    if (password !== repeatPassword) {
      return ResponseService.json(res, 400, 'Password mismatch.');
    }

    user.password = await argon2.hash(password);

    await user.save();

    ResponseService.json(res, 200, 'User password reset successfully.');
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const editUser = async (req: CustomRequest, res: Response) => {
  try {
    const { user } = req;
    const { error, value } = editSchema.validate(req.body);

    if (error) {
      return ResponseService.json(res, error);
    }

    const updatedUser = await PaginateUserModel.findOneAndUpdate(
      { _id: user!.id, isDeleted: { $ne: true } },
      value,
      {
        new: true,
      }
    ).select('-password');

    ResponseService.json(
      res,
      200,
      'User profile updated successfully.',
      updatedUser
    );
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

const deleteUser = async (req: CustomRequest, res: Response) => {
  const { user } = req;
  await PaginateUserModel.findOneAndUpdate(
    { _id: user!.id, isDeleted: { $ne: true } },
    { $set: { isDeleted: true } },
    { new: true }
  );

  ResponseService.json(res, 200, 'User profile deleted successfully.');
};

const setOrChangeRole = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user;
    const { error, value } = setRoleSchema.validate(req.body);

    if (error) {
      return ResponseService.json(res, error);
    }

    const user: UserDocument = (await PaginateUserModel.findOneAndUpdate(
      { _id: userId, isDeleted: { $ne: true } },
      value,
      { new: true }
    ).select('-password')) as UserDocument;

    if (!user) {
      return ResponseService.json(res, 400, 'User not found.');
    }

    ResponseService.json(res, 200, 'User role updated successfully.', user);
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

export {
  currentUser,
  getUsers,
  signup,
  login,
  changePassword,
  reset,
  editUser,
  deleteUser,
  setOrChangeRole,
};
