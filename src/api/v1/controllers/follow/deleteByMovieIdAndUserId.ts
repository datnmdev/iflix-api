import { Request, Response } from 'express'
import mongoose, { Types } from 'mongoose'

import followService from '../../services/follow'
import IRequestUser from '../../interfaces/orthers/IRequestUser'
import movieService from '../../services/movie'

const deleteByMovieIdAndUserId = async (req: Request, res: Response) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    if (await followService.findByMovieIdAndUserId(new Types.ObjectId(req.query.movieId as string), (req.user as IRequestUser).id)) {
      await followService.deleteOne({ movie: new Types.ObjectId(req.query.movieId as string), user: (req.user as IRequestUser).id }, session)
      await movieService.findByIdAndUpdate(new Types.ObjectId(req.query.movieId as string), { $inc: { followerCount: -1 } }, session)
    }

    await session.commitTransaction()
    await session.endSession()

    return res.status(200).json({
      status: 'OK',
      message: 'Unfollowed'
    })
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()

    return res.status(500).json({
      status: 'Internal Server Error',
      error
    })
  }
}

export default deleteByMovieIdAndUserId