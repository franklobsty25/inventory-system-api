import { type Request, type Response } from 'express'
import {
  type LocationDocument,
  PaginateLocationModel
} from '../models/location.model'
import { ResponseService } from '../utils/response.service'
import { type FilterQuery } from 'mongoose'
import {
  createLocationSchema,
  editLocationSchema
} from '../schemas/location.schema'
import { LocationTypeEnum } from '../constants/contants'

const getLocation = async (req: Request, res: Response) => {
  try {
    const locationId = req.params.location

    const location: LocationDocument = (await PaginateLocationModel.findOne({
      _id: locationId,
      isDeleted: { $ne: true }
    }))!

    if (!location) { ResponseService.json(res, 400, 'Location not found.'); return }

    ResponseService.json(
      res,
      200,
      'Location retrieved successfully.',
      location
    )
  } catch (error) {
    ResponseService.json(res, error as Error)
  }
}

const getLocations = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, all, search } = req.query

    const query: FilterQuery<LocationDocument> = {
      isDeleted: { $ne: true }
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { type: { $regex: search, $options: 'i' } }
      ]
    }

    const locations = await PaginateLocationModel.paginate(query, {
      sort: '-1',
      page: Number(page),
      limit: Number(limit),
      pagination: all === 'false'
    })

    ResponseService.json(
      res,
      200,
      'Locations retrieved successfully.',
      locations
    )
  } catch (error) {
    ResponseService.json(res, error as Error)
  }
}

const createLocation = async (req: Request, res: Response) => {
  try {
    const { error, value } = createLocationSchema.validate(req.body)

    if (error) { ResponseService.json(res, error); return }

    if (value.type) {
      const isValid = Object.values(LocationTypeEnum).includes(value.type)

      if (!isValid) { ResponseService.json(res, 400, 'Invalid location type.'); return }
    }

    const location: LocationDocument = await PaginateLocationModel.create(
      value
    )

    ResponseService.json(res, 201, 'Location created successfully.', location)
  } catch (error) {
    ResponseService.json(res, error as Error)
  }
}

const editLocation = async (req: Request, res: Response) => {
  try {
    const location = req.params.location
    const { error, value } = editLocationSchema.validate(req.body)

    if (error) ResponseService.json(res, error)

    if (value.type) {
      const isValid = Object.values(LocationTypeEnum).includes(value.type)

      if (!isValid) { ResponseService.json(res, 400, 'Invalid location type.'); return }
    }

    const updatedLocation: LocationDocument =
      (await PaginateLocationModel.findOneAndUpdate(
        { _id: location, isDeleted: { $ne: true } },
        value,
        { new: true }
      ))!

    if (!updatedLocation) {
      ResponseService.json(
        res,
        400,
        'Location to be updated not found.'
      ); return
    }

    ResponseService.json(
      res,
      200,
      'Location updated successfully.',
      updatedLocation
    )
  } catch (error) {
    ResponseService.json(res, error as Error)
  }
}

const deleteLocation = async (req: Request, res: Response) => {
  const location = req.params.location

  const deletedLocation: LocationDocument =
    (await PaginateLocationModel.findOneAndUpdate(
      { _id: location, isDeleted: { $ne: true } },
      { $set: { isDeleted: true } },
      { new: true }
    ))!

  if (!deletedLocation) { ResponseService.json(res, 400, 'Location to be deleted not found.'); return }

  ResponseService.json(res, 200, 'Location deleted successfully.')
}

export {
  getLocation,
  getLocations,
  createLocation,
  editLocation,
  deleteLocation
}
