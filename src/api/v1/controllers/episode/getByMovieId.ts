import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'

import episodeService from '../../services/episode'

const getByMovieId = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.movieId) {
    return next()
  }

  try {
    const episodes = await episodeService.findByMovieId(new Types.ObjectId(req.query.movieId as string))
  
    return res.status(200).json(episodes)
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'An internal error occurred while processing the request'
    })
  }
}

export default getByMovieId