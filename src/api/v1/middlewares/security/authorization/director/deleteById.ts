import { NextFunction, Request, Response } from 'express'

import defineAbilityAboutDirectorFor from './rules'
import IRequestUser from '../../../../interfaces/orthers/IRequestUser'

const deleteById = (req: Request, res: Response, next: NextFunction) => {
  if (defineAbilityAboutDirectorFor(req.user as IRequestUser).can('delete', 'Director')) {
    return next()
  }

  return res.status(403).json({
    status: 'Forbidden',
    message: 'Access Denied'
  })
}

export default deleteById