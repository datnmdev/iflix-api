import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

const createSchema = Joi.object({
  movie: Joi.string()
    .hex()
    .min(24)
    .max(24)
})

export default async function create(req: Request, res: Response, next: NextFunction) {
  const { value, error } = createSchema.validate(req.body)

  if (error) {
    return res.status(400).json(error)
  }

  req.body = value
  return next()
}