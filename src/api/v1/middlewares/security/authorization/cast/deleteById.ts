import { NextFunction, Request, Response } from 'express'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'
import defineAbilityAboutCastFor from './rules'

const deleteById = (req: Request, res: Response, next: NextFunction) => {
  if (defineAbilityAboutCastFor(req.user as IRequestUser).can('delete', 'Cast')) {
    return next()
  }

  return res.status(403).json({
    status: 'Forbidden',
    message: 'Access Denied'
  })
}

export default deleteById