import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'

import userSevice from '../../services/user'

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userSevice.findById(new Types.ObjectId(req.params.id))

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }

}

export default getById