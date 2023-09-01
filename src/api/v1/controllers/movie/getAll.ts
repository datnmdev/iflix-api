import { Request, Response } from 'express'

import movieService from '../../services/movie'

const getAll = async (req: Request, res: Response) => {
  try {
    const movies = await movieService.findAll()

    return res.status(200).json(movies)
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default getAll