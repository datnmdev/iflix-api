import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import fs from 'fs'

const createSchema = Joi.object({
  title: Joi.string()
    .empty()
    .required(),
  alias: Joi.array()
    .min(0)
    .items(Joi.string().empty()),
  description: Joi.string(),
  episode: Joi.object({
    total: Joi.number()
      .min(0),
    numberOfEpisodesReleased: Joi.number()
      .min(0)
  }),
  release: Joi.number()
    .integer()
    .required(),
  duration: Joi.object({
    value: Joi.number()
      .required(),
    meaning: Joi.string()
      .required()
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

export default async function create(req: Request, res: Response, next: NextFunction) {
  const { value, error } = createSchema.validate(req.body)

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