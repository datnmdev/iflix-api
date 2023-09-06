import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { Types } from 'mongoose'

import episodeService from '../../services/episode'
import commentService from '../../services/comment'

const bodySchema = Joi.object({
  text: Joi.string()
    .empty()
    .required(),
  episode: Joi.string()
    .hex()
    .min(24)
    .max(24)
    .required(),
  parent: Joi.string()
    .hex()
    .min(24)
    .max(24)
})

export default async function create(req: Request, res: Response, next: NextFunction) {
  const { value, error } = bodySchema.validate(req.body)

  if (error) {
    return res.status(400).json(error)
  }

  const episode = await episodeService.findById(new Types.ObjectId(req.body.episode))
  if (!episode) {
    return res.status(400).json({ message: 'Invalid episode field' }) 
  }

  if (req.body.parent) {
    const parentComment = await commentService.findById(new Types.ObjectId(req.body.parent))
    if (!parentComment || parentComment.episode.toString() !== episode._id.toString()) {
      return res.status(400).json({ message: 'Invalid parent field' }) 
    }
  }

  req.body = value
  return next()
}