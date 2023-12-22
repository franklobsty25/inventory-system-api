import mongoose, { Document, PaginateModel, SchemaTypes } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import {
  PRODUCT,
  TRANSACTION,
  TransactionTypeEnum,
} from '../constants/contants';

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    type: { type: String, default: TransactionTypeEnum.RECEIPT },
    quantity: { type: Number, default: 1 },
    date: { type: Date, default: new Date() },
    isDeleted: { type: Boolean, default: false },
    product: { type: SchemaTypes.ObjectId, required: true, ref: PRODUCT },
  },
  { timestamps: true }
);

TransactionSchema.plugin(paginate);

interface TransactionDocument extends Document {
  type: TransactionTypeEnum;
  quantity: number;
  date: Date;
  product: string;
}

const PaginateTransactionModel = mongoose.model<
  TransactionDocument,
  PaginateModel<TransactionDocument>
>(TRANSACTION, TransactionSchema);

export { PaginateTransactionModel, TransactionDocument };
