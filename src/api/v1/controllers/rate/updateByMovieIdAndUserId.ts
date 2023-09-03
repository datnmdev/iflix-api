import { Request, Response } from 'express'
import mongoose, { Types } from 'mongoose'

import IRate from '../../interfaces/entities/IRate'
import IRequestUser from '../../interfaces/orthers/IRequestUser'
import rateService from '../../services/rate'
import movieService from '../../services/movie'

const updateByMovieIdAndUserId = async (req: Request, res: Response) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const rateData: IRate = {
      stars: Number(req.body.stars),
      movie: new Types.ObjectId(req.body.movie),
      user: (req.user as IRequestUser).id
    }

    const rate = await rateService.findByMovieIdAndUserId(rateData.movie, rateData.user)

    if (rate) {
      const movie = await movieService.findById(rateData.movie)

      if (movie) {
        movie.ratingSummary!.starRatingCount += rateData.stars - rate.stars
        await movie.save({ session })

        rate.stars = rateData.stars
        await rate.save({ session })
      }
    }

    await session.commitTransaction()
    await session.endSession()

    return res.status(200).json({
      status: 'OK',
      message: 'Review information updated successfully.'
    })
  } catch (error) {
    await session.commitTransaction()
    await session.endSession()

    return res.status(500).json({
      status: 'Internal Server Error',
      error
    })
  }
}

export default updateByMovieIdAndUserId