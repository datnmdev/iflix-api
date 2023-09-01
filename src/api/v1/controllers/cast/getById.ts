import { Request, Response } from 'express'
import { Types } from 'mongoose'

import castService from '../../services/cast'

const getById = async (req: Request, res: Response) => {
  try {
    const cast = await castService.findById(new Types.ObjectId(req.params.id))

    return res.status(200).json(cast)
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default getById