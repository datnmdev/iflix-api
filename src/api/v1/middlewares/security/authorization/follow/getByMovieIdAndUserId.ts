import { NextFunction, Request, Response } from 'express'
 
import IRequestUser from '../../../../interfaces/orthers/IRequestUser'
import defineAbilityAboutFollowFor from './rules'

const getByMovieIdAndUserId = (req: Request, res: Response, next: NextFunction) => {
  if (defineAbilityAboutFollowFor(req.user as IRequestUser).can('read', 'Follow')) {
    return next()
  }

  return res.status(403).json({
    status: 'Forbidden',
    message: 'Access Denied'
  })
}

export default getByMovieIdAndUserId