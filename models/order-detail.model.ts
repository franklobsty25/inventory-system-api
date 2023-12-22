import mongoose, { type Document, type PaginateModel, SchemaTypes } from 'mongoose'
import { ORDER, ORDER_DETAIL, PRODUCT } from '../constants/contants'
import paginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema

const OrderDetailSchema = new Schema(
  {
    description: { type: String, required: false },
    quantity: { type: Number, default: 1 },
    unitPrice: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    order: { type: SchemaTypes.ObjectId, required: true, ref: ORDER },
    product: { type: SchemaTypes.ObjectId, required: true, ref: PRODUCT }
  },
  { timestamps: true }
)

OrderDetailSchema.plugin(paginate)

interface OrderDetailDocument extends Document {
  description: string
  quantity: number
  unitPrice: number
  order: string
  product: string
}

const PaginateOrderDetailModel = mongoose.model<
OrderDetailDocument,
PaginateModel<OrderDetailDocument>
>(ORDER_DETAIL, OrderDetailSchema)

export { PaginateOrderDetailModel, type OrderDetailDocument }
