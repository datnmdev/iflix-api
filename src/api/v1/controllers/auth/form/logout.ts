import { NextFunction, Request, Response } from 'express'

import { redisClient } from '../../../../../config/redis'
import IRequestUser from '../../../interfaces/orthers/IRequestUser'

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = (req.headers['authorization'] as string).split(' ')[1]
    
    await redisClient.del(refreshToken + ':' + (req.user as IRequestUser).id)

    return res.status(200).json({
      message: 'Logout successful!'
    })
  } catch (err) {
    return next(err)
  }
}

export default logout