import { NextFunction, Request, Response } from 'express'

import defineAbilityAboutMovieFor from './rules'
import IRequestUser from '../../../../interfaces/orthers/IRequestUser'

const create = (req: Request, res: Response, next: NextFunction) => {
  if (defineAbilityAboutMovieFor(req.user as IRequestUser).can('create', 'Movie')) {
    return next()
  }
  
  return res.status(403).json({
    status: 'Forbidden',
    message: 'Access Denied'
  })
}

export default create