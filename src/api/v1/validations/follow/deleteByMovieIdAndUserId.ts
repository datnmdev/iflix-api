import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { Types } from 'mongoose'
import movieService from '../../services/movie'

const querySchema = Joi.object({
  movieId: Joi.string()
    .hex()
    .min(24)
    .max(24)
    .required()
})

export default async function deleteByMovieIdAndUserId(req: Request, res: Response, next: NextFunction) {
  const { value, error } = querySchema.validate(req.query)

  if (error) {
    return res.status(400).json(error)
  }

  const movie = await movieService.findById(new Types.ObjectId(String(req.query.movieId)))
  if (!movie) {
    return res.status(400).json({
      message: 'Invalid movieId query parameter'
    })
  }

  req.query = value
  return next()
}