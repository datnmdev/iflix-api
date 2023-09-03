import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

const updateByIdSchema = Joi.object({
  name: Joi.string()
    .empty()
})

export default function updateById(req: Request, res: Response, next: NextFunction) {
  const { value, error } = updateByIdSchema.validate(req.body)

  if (error) {
    return res.status(400).json(error)
  }

  req.body = value
  return next()
}