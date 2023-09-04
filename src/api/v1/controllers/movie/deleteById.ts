import { Request, Response } from 'express'
import mongoose, { Types } from 'mongoose'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

import movieService from '../../services/movie'

dotenv.config()

const POSTER_DEFAULT = process.env.POSTER_DEFAULT as string

const deleteById = async (req: Request, res: Response) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const deletedMovie = await movieService.findByIdAndDelete(new Types.ObjectId(req.params.id), session)

    if (deletedMovie && !deletedMovie.posterUrl?.endsWith(POSTER_DEFAULT)) {
      const posterPath = path.join(process.cwd(), 'public', deletedMovie.posterUrl as string)
      try {
        await fs.promises.access(posterPath, fs.constants.F_OK)
        await fs.promises.unlink(posterPath)
      } catch (error) {
        // console.log(error)
      }
    }

    await session.commitTransaction()
    await session.endSession()

    return res.status(200).json({
      status: 'OK',
      message: 'The movie has been deleted successfully'
    })
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    
    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'The movie hasn\'t been deleted successfully'
    })
  }
}

export default deleteById