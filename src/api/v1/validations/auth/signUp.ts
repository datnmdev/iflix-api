import { NextFunction, Request, Response } from 'express'
import joi from 'joi'

const signUpSchema = joi.object({
  username: joi.string()
    .required()
    .empty()
    .min(6)
    .alphanum()
    .lowercase(),
  name: joi.object({
    first: joi.string()
      .required()
      .empty(),
    last: joi.string()
      .required()
      .empty()
  }),
  email: joi.string()
    .required()
    .empty()
    .email(),
  password: joi.string()
    .required()
    .empty()
    .min(8),
  repeatPassword: joi.string()
    .required()
    .empty()
    .valid(joi.ref('password'))
})

export default function signUp(req: Request, res: Response, next: NextFunction) {
  const { value, error } = signUpSchema.validate(req.body)

  if (error) {
    return res.status(400).json(error)
  }

  req.body = value
  return next()
}

