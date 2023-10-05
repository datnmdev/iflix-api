import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

import IMovie from '../../interfaces/entities/IMovie'
import movieService from '../../services/movie'

dotenv.config()

const UPLOADS_POSTER_PATH = process.env.UPLOADS_POSTER_PATH as string

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movieData = req.body

    const convertedMovie: IMovie = {
      title: String(movieData.title),
      alias: movieData?.alias ? movieData.alias : [],
      duration: String(movieData.duration),
      description: movieData?.description,
      episode: movieData.episode,
      release: Number(movieData.release),
      genres: movieData?.genres ? movieData.genres.map((genre: string) => new Types.ObjectId(genre)) : [],
      casts: movieData?.casts ? movieData.casts.map((cast: string) => new Types.ObjectId(cast)) : [],
      directors: movieData?.directors ? movieData.directors.map((director: string) => new Types.ObjectId(director)) : [],
      country: movieData?.country ? new Types.ObjectId(movieData.country) : undefined
    }

    const savedMovie = await movieService.create(convertedMovie)

    if (req.file) {
      req.body.posterUrl = path.join(UPLOADS_POSTER_PATH, savedMovie._id + '.' + req.file.mimetype.split('/')[1])
      savedMovie.posterUrl = req.body.posterUrl
      await savedMovie.save()
      await fs.promises.rename(req.file.path, path.join('public', req.body.posterUrl))
    }

    return res.status(201).json({
      status: 'Created',
      message: 'The movie has been created successfully'
    })
  } catch (error) {
    // Delete the successfully uploaded file (if any) previously
    if (req.body.posterUrl) {
      const avatarPath = path.join(process.cwd(), 'public', req.body.posterUrl)
      try {
        await fs.promises.access(avatarPath, fs.constants.F_OK)
        await fs.promises.unlink(avatarPath)
      } catch (error) {
        next(error)
      }
    } else if (req.file) {
      const avatarPath = path.join(process.cwd(), req.file.path)
      try {
        await fs.promises.access(avatarPath, fs.constants.F_OK)
        await fs.promises.unlink(avatarPath)
      } catch (error) {
        next(error)
      }
    }

    return res.status(500).json({
      status: 'Internal Server Error',
      error
    })
  }
}

export default create