import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { Types } from 'mongoose'

import episodeService from '../../services/episode'

const paramsSchema = Joi.object({
  id: Joi.string()
    .hex()
    .min(24)
    .max(24)
    .required()
})

export default async function deleteById(req: Request, res: Response, next: NextFunction) {
  const { value, error } = paramsSchema.validate(req.params)

  if (error) {
    return res.status(400).json(error)
  }

  const episode = await episodeService.findById(new Types.ObjectId(req.params.id))
  if (!episode) {
    return res.status(400).json({
      message: 'Invalid id parameter'
    })
  }

  req.params = value
  return next()
}