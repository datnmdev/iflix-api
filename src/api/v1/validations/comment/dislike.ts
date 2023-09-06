import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { Types } from 'mongoose'

import commentService from '../../services/comment'

const querySchema = Joi.object({
  action: Joi.string()
    .equal('dislike')
    .required()
})

const paramsSchema = Joi.object({
  id: Joi.string()
    .hex()
    .min(24)
    .max(24)
    .required()
})

export default async function dislike(req: Request, res: Response, next: NextFunction) {
  if (!req.query.action || req.query.action !== 'dislike') {
    return next()
  }

  const paramsValidator = paramsSchema.validate(req.params)
  const queryValidator = querySchema.validate(req.query)
  
  if (paramsValidator.error || queryValidator.error) {
    return res.status(400).json(paramsValidator.error ? paramsValidator.error : queryValidator.error)
  }
  
  const comment = await commentService.findById(new Types.ObjectId(req.params.id))
  if (!comment) {
    return res.status(400).json({ message: 'Invalid id parameter' })
  }

  req.params = paramsValidator.value
  req.query = queryValidator.value
  return next()
}