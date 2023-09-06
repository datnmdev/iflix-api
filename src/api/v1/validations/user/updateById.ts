import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import fs from 'fs'
import userSevice from '../../services/user'
import { Types } from 'mongoose'

const paramsSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required()
})

const bodySchema = Joi.object({
  name: Joi.object({
    first: Joi.string()
      .empty(),
    last: Joi.string()
      .empty()
  }),
  email: Joi.string()
    .empty()
    .email(),
  password: Joi.string()
    .empty()
    .min(8)
})

export default async function updateById(req: Request, res: Response, next: NextFunction) {
  const paramsValidator = paramsSchema.validate(req.params)
  const bodyValidator = bodySchema.validate(req.body)

  if (paramsValidator.error || bodyValidator.error) {
    if (req.file) {
      try {
        await fs.promises.unlink(req.file.path)
      } catch (error) {
        next(error)
      }
    }
    return res.status(400).json(paramsValidator.error ? paramsValidator.error : bodyValidator.error)
  }

  const user = await userSevice.findById(new Types.ObjectId(req.params.id))
  if (!user) {
    return res.status(400).json({
      message: 'Invalid id parameter'
    })
  }

  req.params = paramsValidator.value
  req.body = bodyValidator.value
  return next()
}