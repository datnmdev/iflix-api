import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { Types } from 'mongoose'

import movieService from '../../services/movie'

const updateByMovieIdAndUserIdSchema = Joi.object({
  stars: Joi.number()
    .min(1)
    .max(5)
    .required(),
  movie: Joi.string()
    .hex()
    .length(24)
    .required()
})

export default async function updateByMovieIdAndUserId(req: Request, res: Response, next: NextFunction) {
  const { value, error } = updateByMovieIdAndUserIdSchema.validate(req.body)

  if (error) {
    return res.status(400).json(error)
  }

  const movie = await movieService.findById(new Types.ObjectId(req.body.movie))
  if (!movie) {
    return res.status(400).json({
      message: 'Invalid movie field'
    })
  }

  req.body = value
  return next()
}