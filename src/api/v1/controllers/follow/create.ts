import { Request, Response } from 'express'
import mongoose, { Types } from 'mongoose'

import followService from '../../services/follow'
import IFollow from '../../interfaces/entities/IFollow'
import movieService from '../../services/movie'
import IRequestUser from '../../interfaces/orthers/IRequestUser'

const create = async (req: Request, res: Response) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const follow: IFollow = {
      movie: new Types.ObjectId(req.body.movie),
      user: (req.user as IRequestUser).id
    }

    if (!(await followService.findByMovieIdAndUserId(follow.movie, (req.user as IRequestUser).id))) {
      await followService.create(follow, session)
      await movieService.findByIdAndUpdate(follow.movie, { $inc: { followerCount: 1 } }, session)
    }

    await session.commitTransaction()
    await session.endSession()

    return res.status(201).json({
      status: 'Created',
      message: 'Successfully followed'
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