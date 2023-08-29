import { NextFunction, Request, Response } from 'express'
import { subject } from '@casl/ability'

import defineAbilityForUser from './rules'
import IRequestUser from '../../../../interfaces/orthers/IRequestUser'

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  const user: IRequestUser = req.user as IRequestUser

  if ((await defineAbilityForUser(user)).can('update', subject('User', { id: req.params.id }))) {
    return next()
  }

  return res.status(403).json({
    status: 'Forbidden',
    message: 'Access Denied'
  })
}

export default updateById