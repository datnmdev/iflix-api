import { Request, Response } from 'express'
import followService from '../../services/follow'
import IRequestUser from '../../interfaces/orthers/IRequestUser'

const getByUserId = async (req: Request, res: Response) => {
  try {
    const follows = await followService.findByUserId((req.user as IRequestUser).id)

    return res.status(200).json(follows)
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default getByUserId