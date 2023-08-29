import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'
import { subject } from '@casl/ability'

import defineAbilityForUser from './rules'
import IRequestUser from '../../../../interfaces/orthers/IRequestUser'

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IRequestUser = req.user as IRequestUser

    if ((await defineAbilityForUser(user)).can('read', subject('User', { id: new Types.ObjectId(req.params.id) }))) {
      return next()
    }

    return res.status(403).json({
      status: 'Forbidden',
      message: 'Access Denied'
    })
  } catch (error) {
    res.end()
  }

}

export default getById