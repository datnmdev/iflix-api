import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

const getByMovieIdAndUserIdSchema = Joi.object({
  movieId: Joi.string()
    .hex()
    .min(24)
    .max(24)
})

export default async function getByMovieIdAndUserId(req: Request, res: Response, next: NextFunction) {
  const { value, error } = getByMovieIdAndUserIdSchema.validate(req.query)

  if (error) {
    return res.status(400).json(error)
  }

  req.query = value
  return next()
}