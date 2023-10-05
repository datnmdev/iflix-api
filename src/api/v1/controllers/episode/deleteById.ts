import { Request, Response } from 'express'
import mongoose, { Types } from 'mongoose'
import path from 'path'
import fs from 'fs'

import episodeService from '../../services/episode'
import movieService from '../../services/movie'

const deleteById = async (req: Request, res: Response) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const deletedEpisode = await episodeService.findByIdAndDelete(new Types.ObjectId(req.params.id), session)
    await movieService.findByIdAndUpdate(deletedEpisode!.movie, { $inc: { 'episode.numberOfEpisodesReleased': -1 } }, session)

    const videoUrl = path.join(process.cwd(), 'public', deletedEpisode!.videoUrl as string)
    await fs.promises.access(videoUrl, fs.constants.F_OK)
    await fs.promises.unlink(videoUrl)

    await session.commitTransaction()
    await session.endSession()

    return res.status(200).json({
      status: 'OK',
      message: 'The episode has been deleted successfully'
    })
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()

    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'The episode hasn\'t been deleted successfully',
      error
    })
  }
}

export default deleteById