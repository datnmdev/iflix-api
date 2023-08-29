import { Request, Response } from 'express'
import { ExpressJoiError } from 'express-joi-validation'

const validationErrorHandler = (err: ExpressJoiError, req: Request, res: Response) => {
  if (err?.type) {
    return res.status(400).json(err)
  } else {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default validationErrorHandler