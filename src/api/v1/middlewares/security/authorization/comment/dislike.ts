import { NextFunction, Request, Response } from 'express'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'
import defineAbilityAboutCommentFor from './rules'

const dislike = (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.action || req.query.action !== 'dislike') {
    return next()
  }

  if (defineAbilityAboutCommentFor(req.user as IRequestUser).can('update', 'Dislike')) {
    return next()
  }

  return res.status(403).json({
    status: 'Forbidden',
    message: 'Access Denied'
  })
}

export default dislike