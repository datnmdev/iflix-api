import { NextFunction, Request, Response } from 'express'

import defineAbilityAboutMovieFor from './rules'
import IRequestUser from '../../../../interfaces/orthers/IRequestUser'

const updateById = (req: Request, res: Response, next: NextFunction) => {
  if (defineAbilityAboutMovieFor(req.user as IRequestUser).can('update', 'Movie')) {
    return next()
  }
  
  return res.status(403).json({
    status: 'Forbidden',
    message: 'Access Denied'
  })
}

export default updateById