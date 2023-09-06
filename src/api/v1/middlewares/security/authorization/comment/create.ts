import { NextFunction, Request, Response } from 'express'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'
import defineAbilityAboutCommentFor from './rules'

const create = (req: Request, res: Response, next: NextFunction) => {
  if (defineAbilityAboutCommentFor(req.user as IRequestUser).can('create', 'Comment')) {
    return next()
  }

  return res.status(403).json({
    status: 'Forbidden',
    message: 'Access Denied'
  })
}

export default create