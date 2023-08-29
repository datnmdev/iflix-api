import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'

import userSevice from '../../services/userService'

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = new Types.ObjectId(req.params.id)
    const user = await userSevice.findById(id)

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }

}

export default getById