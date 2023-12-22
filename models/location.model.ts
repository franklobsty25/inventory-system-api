import mongoose, { type Document, type PaginateModel } from 'mongoose'
import { LOCATION, LocationTypeEnum } from '../constants/contants'
import paginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema

const LocationSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    type: { type: String, default: LocationTypeEnum.SHELVES },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
)

LocationSchema.plugin(paginate)

interface LocationDocument extends Document {
  name: string
  description: string
  type: LocationTypeEnum
}

const PaginateLocationModel = mongoose.model<
LocationDocument,
PaginateModel<LocationDocument>
>(LOCATION, LocationSchema)

export { PaginateLocationModel, type LocationDocument }
