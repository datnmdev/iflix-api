import { Request, Response } from 'express'
import mongoose, { Types } from 'mongoose'

import followService from '../../services/follow'
import IRequestUser from '../../interfaces/orthers/IRequestUser'
import movieService from '../../services/movie'

const deleteByUserIdAndMovieId = async (req: Request, res: Response) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    if (await followService.findByMovieIdAndUserId(new Types.ObjectId(req.params.id), (req.user as IRequestUser).id)) {
      await followService.deleteOne({ movie: new Types.ObjectId(req.params.id), user: (req.user as IRequestUser).id }, session)
      await movieService.findByIdAndUpdate(new Types.ObjectId(req.params.id), { $inc: { followerCount: -1 } }, session)
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

export default deleteByUserIdAndMovieId