import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

const getByUserIdAndDateSchema = Joi.object({
  date: Joi.string()
    .isoDate()
    .required()
})

export default async function getByUserIdAndDate(req: Request, res: Response, next: NextFunction) {
  const { value, error } = getByUserIdAndDateSchema.validate(req.query)

  if (error) {
    return res.status(400).json(error)
  }

  req.query = value
  return next()
}