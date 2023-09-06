import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { Types } from 'mongoose'

import commentService from '../../services/comment'

const querySchema = Joi.object({
  parentId: Joi.string()
    .hex()
    .min(24)
    .max(24)
    .required(),
  page: Joi.number()
    .min(1)
    .required()
})

export default async function getChildByParentId(req: Request, res: Response, next: NextFunction) {
  if (!req.query.parentId || !req.query.page) {
    return next()
  }

  const { value, error } = querySchema.validate(req.query)

  if (error) {
    return res.status(400).json(error)
  }

  const comment = await commentService.findById(new Types.ObjectId(String(req.query.parentId)))
  if (!comment) {
    return res.status(400).json({
      message: 'Invalid parentId query parameter'
    })
  }

  req.query = value
  return next()
}