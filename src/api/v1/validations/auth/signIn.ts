import { NextFunction, Request, Response } from 'express'
import joi from 'joi'

const signInSchema = joi.object({
  username: joi.string()
    .required()
    .empty()
    .min(6)
    .alphanum()
    .lowercase(),
  password: joi.string()
    .required()
    .empty()
    .min(8)
})

export default function signIn(req: Request, res: Response, next: NextFunction) {
  const { value, error } = signInSchema.validate(req.body)

  if (error) {
    return res.status(400).json(error)
  }

  req.body = value
  return next()
}

