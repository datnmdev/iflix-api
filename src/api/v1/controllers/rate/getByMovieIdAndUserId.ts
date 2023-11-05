import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'

import rateService from '../../services/rate'

const getByMovieIdAndUserId = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.movieId || !req.query.userId) {
    return next()
  }

  try {
    const rate = await rateService.findByMovieIdAndUserId(new Types.ObjectId(req.query.movieId as string), new Types.ObjectId(req.query.userId as string))

    return res.status(200).json(rate)
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default getByMovieIdAndUserId