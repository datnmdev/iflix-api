import { NextFunction, Request, Response } from 'express'

const commonErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    return res.status(500).json({ err })
  }
  return next()
}

export default commonErrorHandler