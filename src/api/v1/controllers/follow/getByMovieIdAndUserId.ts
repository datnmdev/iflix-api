import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'

import followService from '../../services/follow'
import IRequestUser from '../../interfaces/orthers/IRequestUser'

const getByMovieIdAndUserId = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.movieId) {
    return next()
  }

  try {
    const follow = await followService.findByMovieIdAndUserId(new Types.ObjectId(req.query.movieId as string), (req.user as IRequestUser).id)

    if (follow) {
      return res.status(200).json(follow)
    }

    return res.status(200).json()
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default getByMovieIdAndUserId