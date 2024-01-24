import { type Response } from 'express'
import { get, isNil, isEmpty } from 'lodash'

export class ResponseObject<T> {
  code?: string

  message?: string

  data?: T

  meta?: unknown
}

const defaultStatus = 400

export class ResponseService {
  static json<T>(
    res: Response,
    statusOrError: number | Error,
    message?: string,
    data?: Record<string, unknown> | Array<Record<string, unknown>> | T,
    meta?: unknown,
    code?: string
  ): void {
    const error = statusOrError instanceof Error ? statusOrError : null

    const response: ResponseObject<typeof data> = {}
    response.message = message

    let status = statusOrError

    if (error) {
      const errorObj = statusOrError as Error
      response.message = message || errorObj.message
      status = get(errorObj, 'status', defaultStatus)
    }

    if (!isNil(data)) {
      response.data = data
    }

    if (!isNil(meta)) {
      response.meta = meta
    }

    if (!isEmpty(code)) {
      response.code = code
    }

    const statusCode = status as number

    res.status(statusCode).json(response)
  }
}
