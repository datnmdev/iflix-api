import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

const updateByMovieIdAndUserIdSchema = Joi.object({
  stars: Joi.number()
    .min(1)
    .max(5)
    .required(),
  movie: Joi.string()
    .hex()
    .min(24)
    .max(24)
    .required()
})

export default async function updateByMovieIdAndUserId(req: Request, res: Response, next: NextFunction) {
  const { value, error } = updateByMovieIdAndUserIdSchema.validate(req.body)

  if (error) {
    return res.status(400).json(error)
  }

  req.body = value
  return next()
}