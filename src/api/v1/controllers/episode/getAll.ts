import { Request, Response } from 'express'

import episodeService from '../../services/episode'

const getAll = async (req: Request, res: Response) => {
  try {
    const episodes = await episodeService.findAll()
  
    return res.status(200).json(episodes)
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'An internal error occurred while processing the request'
    })
  }
}

export default getAll