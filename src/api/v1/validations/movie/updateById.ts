import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import fs from 'fs'

const updateByIdSchema = Joi.object({
  title: Joi.string()
    .empty()
    .required(),
  alias: Joi.array()
    .min(0)
    .items(Joi.string().empty()),
  description: Joi.string(),
  release: Joi.number()
    .integer()
    .required(),
  duration: Joi.string()
    .empty()
    .required(),
  episode: Joi.object({
    total: Joi.number()
      .min(0),
    numberOfEpisodesReleased: Joi.number()
      .min(0)
  }),
  genres: Joi.array()
    .min(0)
    .items(Joi.string().hex().length(24)),
  directors: Joi.array()
    .min(0)
    .items(Joi.string().hex().length(24)),
  casts: Joi.array()
    .min(0)
    .items(Joi.string().hex().length(24)),
  country: Joi.string()
    .hex()
    .length(24)
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