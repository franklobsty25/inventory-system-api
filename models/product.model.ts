import mongoose, { type Document, type PaginateModel, SchemaTypes } from 'mongoose'
import { CategoryEnum, PRODUCT, SUPPLIER } from '../constants/contants'
import paginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    category: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    reorder: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    supplier: { type: SchemaTypes.ObjectId, required: true, ref: SUPPLIER }
  },
  { timestamps: true }
)

ProductSchema.plugin(paginate)

interface ProductDocument extends Document {
  name: string
  description: string
  category: CategoryEnum,
  unitPrice: number
  quantity: number
  reorder: boolean
  supplier: string
}

const PaginateProductModel = mongoose.model<
ProductDocument,
PaginateModel<ProductDocument>
>(PRODUCT, ProductSchema)

export { PaginateProductModel, type ProductDocument }
