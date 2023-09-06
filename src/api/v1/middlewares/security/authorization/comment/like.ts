import { NextFunction, Request, Response } from 'express'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'
import defineAbilityAboutCommentFor from './rules'

const like = (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.action || req.query.action !== 'like') {
    return next()
  }

  if (defineAbilityAboutCommentFor(req.user as IRequestUser).can('update', 'Like')) {
    return next()
  }

  return res.status(403).json({
    status: 'Forbidden',
    message: 'Access Denied'
  })
}

export default like