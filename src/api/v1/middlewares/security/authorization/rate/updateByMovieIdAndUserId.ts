import { NextFunction, Request, Response } from 'express'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'
import defineAbilityAboutRateFor from './rules'

const updateByMovieIdAndUserId = (req: Request, res: Response, next: NextFunction) => {
  if (defineAbilityAboutRateFor(req.user as IRequestUser).can('update', 'Rate')) {
    return next()
  }

  return res.status(403).json({
    status: 'Forbidden',
    message: 'Access Denied'
  })
}

export default updateByMovieIdAndUserId