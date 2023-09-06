import { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

import IEpisode from '../../interfaces/entities/IEpisode'
import episodeService from '../../services/episode'
import mongoose from 'mongoose'
import movieService from '../../services/movie'
import { Types } from 'mongoose'

dotenv.config()

const UPLOADS_VIDEO_PATH = process.env.UPLOADS_VIDEO_PATH as string

const create = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const episodeData: IEpisode = {
      ordinalNumber: req.body.ordinalNumber,
      name: req.body.name,
      movie: new Types.ObjectId(req.body.movie)
    }
    if (req.file) {
      const savedEpisode = await episodeService.create(episodeData, session)

      await movieService.findByIdAndUpdate(savedEpisode.movie, { $inc: { episodeCount: 1 } }, session)

      const videoDirectoryPath = path.join(process.cwd(), 'public', UPLOADS_VIDEO_PATH, savedEpisode.movie.toString())
      try {
        await fs.promises.access(videoDirectoryPath, fs.constants.F_OK)
      } catch (error) {
        await fs.promises.mkdir(videoDirectoryPath, { recursive: true })
      }

      savedEpisode.videoUrl = path.join(UPLOADS_VIDEO_PATH, savedEpisode.movie.toString(), savedEpisode._id.toString() + '.' + req.file.mimetype.split('/')[1])
      await savedEpisode.save({ session })
      req.body.videoUrl = savedEpisode.videoUrl
      await fs.promises.rename(req.file.path, path.join('public', savedEpisode.videoUrl))
    }

    await session.commitTransaction()
    await session.endSession()

    return res.status(201).json({
      status: 'Created',
      message: 'Episode created successfully'
    })
  } catch (error) {
    await session.commitTransaction()
    await session.endSession()

    // Delete the successfully uploaded file (if any) previously
    if (req.body.videoUrl) {
      const videoUrl = path.join(process.cwd(), 'public', req.body.videoUrl)
      try {
        await fs.promises.access(videoUrl, fs.constants.F_OK)
        await fs.promises.unlink(videoUrl)
      } catch (error) {
        return next(error)
      }
    } else if (req.file) {
      const videoUrl = path.join(process.cwd(), req.file.path)
      try {
        await fs.promises.access(videoUrl, fs.constants.F_OK)
        await fs.promises.unlink(videoUrl)
      } catch (error) {
        return next(error)
      }
    }

    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'The episode hasn\'t been created successfully'
    })
  }

}

export default create