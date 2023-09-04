import { Request, Response } from 'express'
import { Types } from 'mongoose'

import episodeService from '../../services/episode'

const getById = async (req: Request, res: Response) => {
  try {
    const episode = await episodeService.findById(new Types.ObjectId(req.params.id))
  
    return res.status(200).json(episode)
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'An internal error occurred while processing the request'
    })
  }
}

export default getById