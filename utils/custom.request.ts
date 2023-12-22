import { type Request } from 'express'

export default interface CustomRequest extends Request {
  user?: Record<string, string>
}
