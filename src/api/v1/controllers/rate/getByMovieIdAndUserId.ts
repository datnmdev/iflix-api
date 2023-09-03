import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'

import IRequestUser from '../../interfaces/orthers/IRequestUser'
import rateService from '../../services/rate'

const getByMovieIdAndUserId = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.movieId) {
    return next()
  }

  try {
    const rate = await rateService.findByMovieIdAndUserId(new Types.ObjectId(req.query.movieId as string), (req.user as IRequestUser).id)

    if (rate) {
      return res.status(200).json(rate)
    }

    return res.status(200).json()
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default getByMovieIdAndUserId