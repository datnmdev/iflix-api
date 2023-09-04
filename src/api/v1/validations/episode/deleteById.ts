import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

const deleteByIdSchema = Joi.object({
  id: Joi.string()
    .hex()
    .min(24)
    .max(24)
})

export default async function deleteById(req: Request, res: Response, next: NextFunction) {
  const { value, error } = deleteByIdSchema.validate(req.params)

  if (error) {
    return res.status(400).json(error)
  }

  req.body = value
  return next()
}