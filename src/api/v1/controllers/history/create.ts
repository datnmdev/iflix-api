import { Request, Response } from 'express'
import mongoose, { Types } from 'mongoose'

import IHistory from '../../interfaces/entities/IHistory'
import historyService from '../../services/history'
import IRequestUser from '../../interfaces/orthers/IRequestUser'
import movieService from '../../services/movie'
import episodeService from '../../services/episode'

const create = async (req: Request, res: Response) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const historyData: IHistory = {
      episode: new Types.ObjectId(req.body.episode),
      user: (req.user as IRequestUser).id
    }

    await historyService.create(historyData, session)

    const movieId = (await episodeService.findById(historyData.episode))!.movie
    await movieService.findByIdAndUpdate(movieId, { $inc: { views: 1 } }, session)

    await session.commitTransaction()
    await session.endSession()

    return res.status(200).json({
      status: 'OK'
    })
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()

    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default create