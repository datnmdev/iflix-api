import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { Types } from 'mongoose'

import genreService from '../../services/genre'

const paramsSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required()
})

export default async function getById(req: Request, res: Response, next: NextFunction) {
  const paramsValidator = paramsSchema.validate(req.params)

  if (paramsValidator.error) {
    return res.status(400).json(paramsValidator.error)
  }

  const genre = await genreService.findById(new Types.ObjectId(req.params.id))
  if (!genre) {
    return res.status(400).json({
      message: 'Invalid id parameter'
    })
  }

  req.params = paramsValidator.value
  return next()
}