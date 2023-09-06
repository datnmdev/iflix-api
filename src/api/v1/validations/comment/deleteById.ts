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

export default async function deleteById(req: Request, res: Response, next: NextFunction) {
  const paramsValidator = paramsSchema.validate(req.params)
  
  if (paramsValidator.error) {
    return res.status(400).json(paramsValidator.error)
  }
  
  const comment = await commentService.findById(new Types.ObjectId(req.params.id))
  if (!comment) {
    return res.status(400).json({ message: 'Invalid id parameter' })
  }

  return next()
}