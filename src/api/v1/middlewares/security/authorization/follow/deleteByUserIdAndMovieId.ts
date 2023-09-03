import { NextFunction, Request, Response } from 'express'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'
import defineAbilityAboutFollowFor from './rules'

const deleteByUserIdAndMovieId = (req: Request, res: Response, next: NextFunction) => {
  if (defineAbilityAboutFollowFor(req.user as IRequestUser).can('delete', 'Follow')) {
    return next()
  }

  return res.status(403).json({
    status: 'Forbidden',
    message: 'Access Denied'
  })
}

export default deleteByUserIdAndMovieId