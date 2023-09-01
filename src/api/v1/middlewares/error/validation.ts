import { NextFunction, Request, Response } from 'express'
import { ExpressJoiError } from 'express-joi-validation'

const validationErrorHandler = (err: ExpressJoiError, req: Request, res: Response, next: NextFunction) => {
  if (err?.type) {
    return res.status(400).json(err)
  } else {
    return next(err)
  }
}

export default validationErrorHandler