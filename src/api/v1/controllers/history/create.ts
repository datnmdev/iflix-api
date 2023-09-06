import { Request, Response } from 'express'
import { Types } from 'mongoose'

import IHistory from '../../interfaces/entities/IHistory'
import historyService from '../../services/history'
import IRequestUser from '../../interfaces/orthers/IRequestUser'

const create = async (req: Request, res: Response) => {
  try {
    const historyData: IHistory = {
      episode: new Types.ObjectId(req.body.episode),
      user: (req.user as IRequestUser).id
    }

    await historyService.create(historyData)

    return res.status(200).json({
      status: 'OK'
    })
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default create