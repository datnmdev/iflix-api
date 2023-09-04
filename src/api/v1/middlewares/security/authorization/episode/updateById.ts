import { NextFunction, Request, Response } from 'express'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'
import defineAbilityAboutEpisodeFor from './rules'

const updateById = (req: Request, res: Response, next: NextFunction) => {
  if (defineAbilityAboutEpisodeFor(req.user as IRequestUser).can('update', 'Episode')) {
    return next()
  }

  return res.status(403).json({
    status: 'Forbidden',
    message: 'Access Denied'
  })
}

export default updateById