import { Request, Response } from 'express'
import mongoose, { Types } from 'mongoose'

import movieService from '../../services/movie'
import IRequestUser from '../../interfaces/orthers/IRequestUser'
import IRate from '../../interfaces/entities/IRate'
import rateService from '../../services/rate'

const create = async (req: Request, res: Response) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const rate: IRate = {
      stars: req.body.stars,
      movie: new Types.ObjectId(req.body.movie),
      user: (req.user as IRequestUser).id
    }

    if (!(await rateService.findByMovieIdAndUserId(rate.movie, (req.user as IRequestUser).id))) {
      await rateService.create(rate, session)
      await movieService.findByIdAndUpdate(rate.movie, { $inc: { 'ratingSummary.starRatingCount': rate.stars, 'ratingSummary.reviewCount': 1 } }, session)
    }

    await session.commitTransaction()
    await session.endSession()

    return res.status(201).json({
      status: 'Created',
      message: 'Successfully evaluated'
    })
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()

    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'An error has occurred',
      error
    })
  }
}

export default create