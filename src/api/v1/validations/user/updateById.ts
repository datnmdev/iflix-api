import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import fs from 'fs'

const updateByIdSchema = Joi.object({
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
  console.log(req.body)
  const { value, error } = updateByIdSchema.validate(req.body)

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

  req.body = value
  return next()
}