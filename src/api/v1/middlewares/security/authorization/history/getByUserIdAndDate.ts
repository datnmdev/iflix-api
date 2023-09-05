import { NextFunction, Request, Response } from 'express'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'
import defineAbilityAboutHistoryFor from './rules'

const getByUserIdAndDate = (req: Request, res: Response, next: NextFunction) => {
  if (defineAbilityAboutHistoryFor(req.user as IRequestUser).can('read', 'History')) {
    return next()
  }

  return res.status(403).json({
    status: 'Forbidden',
    message: 'Access Denied'
  })
}

export default getByUserIdAndDate