import mongoose, { Document, PaginateModel, SchemaTypes } from 'mongoose';
import { CUSTOMER, ORDER, OrderStatusEnum } from '../constants/contants';
import paginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    amount: { type: Number, required: true },
    status: { type: String, default: OrderStatusEnum.PENDING },
    date: { type: Date, default: new Date() },
    completedDate: { type: Date, default: new Date() },
    isDeleted: { type: Boolean, default: false },
    customer: { type: SchemaTypes.ObjectId, require: true, ref: CUSTOMER },
  },
  { timestamps: true }
);

OrderSchema.plugin(paginate);

interface OrderDocument extends Document {
  amount: number;
  status: OrderStatusEnum;
  date: Date;
  completedDate: Date;
  customer: string;
}

const PaginateOrderModel = mongoose.model<
  OrderDocument,
  PaginateModel<OrderDocument>
>(ORDER, OrderSchema);

export { PaginateOrderModel, OrderDocument };
