import { NextFunction, Request, Response } from 'express'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'
import defineAbilityAboutCountryFor from './rules'

const deleteById = (req: Request, res: Response, next: NextFunction) => {
  if (defineAbilityAboutCountryFor(req.user as IRequestUser).can('delete', 'Country')) {
    return next()
  }

  return res.status(403).json({
    status: 'Forbidden',
    message: 'Access Denied'
  })
}

export default deleteById