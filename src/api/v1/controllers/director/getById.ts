import { Request, Response } from 'express'
import { Types } from 'mongoose'

import directorService from '../../services/director'

const getById = async (req: Request, res: Response) => {
  try {
    const director = await directorService.findById(new Types.ObjectId(req.params.id))

    return res.status(200).json(director)
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default getById