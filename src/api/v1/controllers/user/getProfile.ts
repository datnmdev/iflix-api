import { Request, Response } from 'express'
import { Types } from 'mongoose'

import userSevice from '../../services/user'
import IRequestUser from '../../interfaces/orthers/IRequestUser'

const getProfile = async (req: Request, res: Response) => {
  try {
    const profile = await userSevice.findById(new Types.ObjectId((req.user as IRequestUser).id))

    return res.status(200).json(profile)
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default getProfile