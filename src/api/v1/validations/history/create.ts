import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { Types } from 'mongoose'

import episodeService from '../../services/episode'

const createSchema = Joi.object({
  episode: Joi.string()
    .hex()
    .min(24)
    .max(24)
    .required()
})

export default async function create(req: Request, res: Response, next: NextFunction) {
  const { value, error } = createSchema.validate(req.body)

  if (error) {
    return res.status(400).json(error)
  }

  const episode = await episodeService.findById(new Types.ObjectId(req.body.episode))
  if (!episode) {
    return res.status(400).json({
      message: 'Invalid episode field'
    })
  }

  req.body = value
  return next()
}