import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import fs from 'fs'
import { Types } from 'mongoose'

import movieService from '../../services/movie'

const bodySchema = Joi.object({
  ordinalNumber: Joi.number()
    .min(1)
    .required(),
  name: Joi.string()
    .empty()
    .required(),
  movie: Joi.string()
    .hex()
    .min(24)
    .max(24)
    .required()
})

export default async function create(req: Request, res: Response, next: NextFunction) {
  const { value, error } = bodySchema.validate(req.body)

  if (error) {
    if (req.file) {
      try {
        await fs.promises.unlink(req.file.path)
      } catch (error) {
        next(error)
      }
    }
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