import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

import movieService from '../../services/movie'
import IMovie from '../../interfaces/entities/IMovie'

dotenv.config()

const UPLOADS_POSTER_PATH = process.env.UPLOADS_POSTER_PATH as string

const updateById = async (req: Request, res: Response) => {
  try {
    const movieData = req.body

    const convertedMovie: IMovie = {
      title: String(movieData.title),
      alias: movieData?.alias ? movieData.alias : [],
      duration: String(movieData.duration),
      description: movieData?.description,
      release: Number(movieData.release),
      genres: movieData?.genres ? movieData.genres.map((genre: string) => new Types.ObjectId(genre)) : [],
      casts: movieData?.casts ? movieData.casts.map((cast: string) => new Types.ObjectId(cast)) : [],
      directors: movieData?.directors ? movieData.directors.map((director: string) => new Types.ObjectId(director)) : [],
      country: movieData?.country ? new Types.ObjectId(movieData.country) : undefined
    }

    if (req.file) {
      convertedMovie.posterUrl = path.join(UPLOADS_POSTER_PATH, req.params.id + '.' + req.file.mimetype.split('/')[1])
      req.body.posterUrl = convertedMovie.posterUrl
      await fs.promises.rename(req.file.path, path.join('public', convertedMovie.posterUrl))
    }

    await movieService.findByIdAndUpdate(new Types.ObjectId(req.params.id), convertedMovie)

    return res.status(200).json({
      status: 'OK',
      message: 'The movie has been updated successfully'
    })
  } catch (error) {
    // Delete the successfully uploaded file (if any) previously
    if (req.body.posterUrl) {
      const avatarPath = path.join(process.cwd(), 'public', req.body.posterUrl)
      try {
        await fs.promises.access(avatarPath, fs.constants.F_OK)
        await fs.promises.unlink(avatarPath)
      } catch (error) {
        // console.log(error)
      }
    } else if (req.file) {
      const avatarPath = path.join(process.cwd(), req.file.path)
      try {
        await fs.promises.access(avatarPath, fs.constants.F_OK)
        await fs.promises.unlink(avatarPath)
      } catch (error) {
        // console.log(error)
      }
    }

    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'The movie hasn\'t been updated successfully'
    })
  }
}

export default updateById