import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

const bodySchema = Joi.object({
  name: Joi.string()
    .empty()
    .required(),
  description: Joi.string()
})

export default async function create(req: Request, res: Response, next: NextFunction) {
  const bodyValidator = bodySchema.validate(req.body)

  if (bodyValidator.error) {
    return res.status(400).json(bodyValidator.error)
  }

  req.body = bodyValidator.value
  return next()
}