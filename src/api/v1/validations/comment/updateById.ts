import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { Types } from 'mongoose'

import commentService from '../../services/comment'

const paramsSchema = Joi.object({
  id: Joi.string()
    .hex()
    .min(24)
    .max(24)
    .required()
})

const bodySchema = Joi.object({
  text: Joi.string()
    .empty()
    .required()
})

export default async function updateById(req: Request, res: Response, next: NextFunction) {
  const paramsValidator = paramsSchema.validate(req.params)
  const bodyValidator = bodySchema.validate(req.body)
  
  if (paramsValidator.error || bodyValidator.error) {
    return res.status(400).json(paramsValidator.error ? paramsValidator.error : bodyValidator.error)
  }
  
  const comment = await commentService.findById(new Types.ObjectId(req.params.id))
  if (!comment) {
    return res.status(400).json({ message: 'Invalid id parameter' })
  }

  req.params = paramsValidator.value
  req.body = bodyValidator.value
  return next()
}