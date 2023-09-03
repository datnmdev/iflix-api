import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import fs from 'fs'

const updateByIdSchema = Joi.object({
  name: Joi.string()
    .empty()
})

export default async function updateById(req: Request, res: Response, next: NextFunction) {
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