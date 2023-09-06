import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { Types } from 'mongoose'

import episodeService from '../../services/episode'

const querySchema = Joi.object({
  episodeId: Joi.string()
    .hex()
    .min(24)
    .max(24)
    .required(),
  page: Joi.number()
    .min(1)
    .required()
})

export default async function getByEpisodeId(req: Request, res: Response, next: NextFunction) {
  if (!req.query.episodeId || !req.query.page) {
    return next()
  }

  const { value, error } = querySchema.validate(req.query)

  if (error) {
    return res.status(400).json(error)
  }

  const episode = await episodeService.findById(new Types.ObjectId(String(req.query.episodeId)))
  if (!episode) {
    return res.status(400).json({
      message: 'Invalid episodeId query parameter'
    })
  }

  req.query = value
  return next()
}