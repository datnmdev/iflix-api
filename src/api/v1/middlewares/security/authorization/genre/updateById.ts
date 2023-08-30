import { NextFunction, Response, Request } from 'express'
import defineAbilityAboutGenreFor from './rules'
import IRequestUser from '../../../../interfaces/orthers/IRequestUser'

const updateById = (req: Request, res: Response, next: NextFunction) => {
  if (defineAbilityAboutGenreFor(req.user as IRequestUser).can('create', 'Genre')) {
    return next()
  }

  return res.status(403).json({
    status: 'Forbidden', 
    message: 'Access Denied'
  })
}

export default updateById