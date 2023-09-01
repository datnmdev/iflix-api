import { NextFunction, Request, Response } from 'express'

import defineAbilityAboutDirectorFor from './rules'
import IRequestUser from '../../../../interfaces/orthers/IRequestUser'

const create = (req: Request, res: Response, next: NextFunction) => {
  if (defineAbilityAboutDirectorFor(req.user as IRequestUser).can('create', 'Director')) {
    return next()
  }

  return res.status(403).json({
    status: 'Forbidden',
    message: 'Access Denied'
  })
}

export default create