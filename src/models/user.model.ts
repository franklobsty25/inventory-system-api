import mongoose, { type Document, type PaginateModel } from 'mongoose';
import { RolesEnum, USER } from '../constants/contant';
import paginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    middlename: { type: String, required: false },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: RolesEnum.SUPERADMIN },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.plugin(paginate);

interface UserDocument extends Document {
  firstname: string;
  lastname: string;
  middlename?: string;
  email: string;
  password: string;
  role: RolesEnum;
}

const PaginateUserModel = mongoose.model<
  UserDocument,
  PaginateModel<UserDocument>
>(USER, UserSchema);

export { PaginateUserModel, type UserDocument };
