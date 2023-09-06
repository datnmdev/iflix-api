import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import fs from 'fs'
import castService from '../../services/cast'
import { Types } from 'mongoose'

const paramsSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required()
})

export default async function deleteById(req: Request, res: Response, next: NextFunction) {
  const paramsValidator = paramsSchema.validate(req.params)

  if (paramsValidator.error) {
    if (req.file) {
      try {
        await fs.promises.unlink(req.file.path)
      } catch (error) {
        next(error)
      }
    }
    return res.status(400).json(paramsValidator.error)
  }

  const cast = await castService.findById(new Types.ObjectId(req.params.id))
  if (!cast) {
    return res.status(400).json({
      message: 'Invalid id parameter'
    })
  }

  req.params = paramsValidator.value
  return next()
}