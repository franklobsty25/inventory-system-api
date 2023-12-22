import mongoose, { Document, PaginateModel } from 'mongoose';
import { CUSTOMER } from '../constants/contants';
import paginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    middlename: { type: String, required: false },
    phoneNumber: { type: Number, required: true, unique: true },
    email: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

CustomerSchema.plugin(paginate);

interface CustomerDocument extends Document {
  firstname: string;
  lastname: string;
  middlename?: string;
  phoneNumber: string;
  email: string;
  address1: string;
  address2?: string;
}

const PaginateCustomerModel = mongoose.model<
  CustomerDocument,
  PaginateModel<CustomerDocument>
>(CUSTOMER, CustomerSchema);

export { PaginateCustomerModel, CustomerDocument };
