import { NextFunction, Request, Response } from 'express'
import { subject } from '@casl/ability'

import defineAbilityForUser from './rules'
import IRequestUser from '../../../../interfaces/orthers/IRequestUser'

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  if ((await defineAbilityForUser(req.user as IRequestUser)).can('delete', subject('User', { id: req.params.id }))) {
    return next()
  }

  return res.status(403).json({
    status: 'Forbidden',
    message: 'Access Denied'
  })
}

export default deleteById