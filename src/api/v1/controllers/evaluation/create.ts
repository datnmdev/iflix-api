import { Request, Response } from 'express'
import { Types } from 'mongoose'

import movieService from '../../services/movie'
import genreService from '../../services/genre'
import IEvaluation from '../../interfaces/entities/IEvaluation'
import evaluationService from '../../services/evaluation'

const create = async (req: Request, res: Response) => {
  try {
    const evaluationData: IEvaluation[] = []

    const genresMap = new Map<string, number>()
    const genres = await genreService.findAll()
    genres.map((genre, index) => {
      genresMap.set(genre._id.toString(), index)
    })
    const movie = await movieService.findById(new Types.ObjectId(req.body.movieId))
    const genresIndexOfMovie = movie?.genres.map((genre) => genresMap.get(genre.toString()))
    for (const discomfort of req.body.discomfort) {
      for (const genre of genresIndexOfMovie!) {
        evaluationData.push({
          movieId: req.body.movieId,
          violenceLevel: req.body.violenceLevel,
          discomfort,
          duration: movie!.duration.value,
          genre: genre!,
          suitableAge: req.body.suitableAge
        })
      }
    }

    for (const evaluation of evaluationData) {
      await evaluationService.create(evaluation)
    }

    return res.status(201).json({
      status: 'Created',
      message: 'Genre created successfully'
    })
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'The genre hasn\'t been created successfully' 
    })
  }
}

export default create